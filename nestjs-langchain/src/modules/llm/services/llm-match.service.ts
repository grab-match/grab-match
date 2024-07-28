require('dotenv').config();

import { z } from "zod";
import { Injectable } from '@nestjs/common';
import { Ollama } from "@langchain/community/llms/ollama";
import { LLMChain } from "langchain/chains";
import { OutputFixingParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const promptTemplate = `
Hi AI,

Based on the following data, calculate the compatibility percentage for this couple, giving the highest weight to their zodiac signs, followed by their values and interests. Zodiac compatibility should be emphasized as it often signifies deeper personality traits and potential harmony.

Me data:
{me_json}

Match data:
{me_json}

Question: What is the compatibility percentage for this couple based on their data?

Answer the user's question as best you can:\n{format_instructions}
`;

const outputParser = StructuredOutputParser.fromZodSchema(
    z.object({
        match_percentage: z.number().describe("The percentage of the match 0-100"),
        reason: z.string().describe("The reason for the match percentage, more detailed on the zodiac signs"),
    })
);

@Injectable()
export class LlmMatchService {

    async getMatchPercentage(me, match) {
        me = {
            name: me.name,
            age: me.age,
            short_bio: me.short_bio,
            about: me.about,
            interests: me.interests,
        };
        match = {
            name: match.name,
            age: match.age,
            short_bio: match.short_bio,
            about: match.about,
            interests: match.interests,
        };

        const ollama = new Ollama({
            baseUrl: process.env.LLM_API_URL,
            model: "llama3",
            verbose: true,
        });

        const outputFixingParser = OutputFixingParser.fromLLM(ollama, outputParser);

        const prompt = new PromptTemplate({
            template: promptTemplate,
            inputVariables: ["me_json", "match_json"],
            partialVariables: {
                format_instructions: outputFixingParser.getFormatInstructions(),
            },
        });

        const answerFormattingChain = new LLMChain({
            llm: ollama,
            prompt,
            outputKey: 'output',
            outputParser: outputFixingParser,
        });

        const result = await answerFormattingChain.invoke({
            me_json: me,
            match_json: match,
        });

        return result.output;
    }
}