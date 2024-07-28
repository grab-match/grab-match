require('dotenv').config();

import { z } from "zod";
import { Injectable } from '@nestjs/common';
import { Ollama } from "@langchain/community/llms/ollama";
import { LLMChain } from "langchain/chains";
import { OutputFixingParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const promptTemplate = `
Hai AI you are an assistant for our app to help travel destinations in Jakarta, starting with selecting a place to eat, followed by planning a car trip for sightseeing.

Please the instruction :
You run in a process of input data json, Question.

Use Thought to describe your thoughts about the question you have been asked.
Observation will be the result of running those actions.
Finally at the end, state the Answer include a JSON from your process to generate itinerary.

Data Input:
{input_json}

Question:\n{question}.

Answer the user's question as best you can:\n{format_instructions}
`;


/**
 * output is an array of exampleInput records with the following fields:
    - start_time: string
    - end_time: string
    - duration: string
    - itineraries: [{
      - cid: string
      - title: string
      - address: string
      - location: { lat: number, lon: number }
      - category: string
      - start_time: string
      - end_time: string
      - duration: string
    }]
 */

const outputParser = StructuredOutputParser.fromZodSchema(
  z.object({
    start_time: z.string().describe("Start time of all activities with format 'HH:mm'"),
    end_time: z.string().describe("End time of all activities with format 'HH:mm'"),
    duration: z.string().describe("Total duration of all activities with format 'H hours'"),
    itineraries: z.array(z.object({
      cid: z.string(),
      title: z.string(),
      address: z.string(),
      location: z.object({
        lat: z.number(),
        lon: z.number(),
      }),
      category: z.string(),
      start_time: z.string().describe("Start time of this activity"),
      end_time: z.string().describe("End time of this activity"),
      duration: z.string().describe("Duration of this activity"),
    }),
    )
  }).describe("Output of the LLM model"),
);

@Injectable()
export class LlmService {

  async generateItenary(
    data,
    startTime,
    duration,
    longitude,
    latitude,
  ) {
    data = data.map((item) => {
      return {
        cid: item.cid,
        title: item.title,
        location: {
          lat: item.location.lat,
          lon: item.location.lon,
        },
        open_hours: item.open_hours?.Sunday,
        category: item.category,
        review_count: item.review_count,
        review_rating: item.review_rating,
        description: item.description,
      };
    });

    console.log(data);

    const ollama = new Ollama({
      baseUrl: process.env.LLM_API_URL,
      model: "llama3",
      verbose: true,
    });

    const outputFixingParser = OutputFixingParser.fromLLM(ollama, outputParser);

    const prompt = new PromptTemplate({
      template: promptTemplate,
      inputVariables: ["input_json", "question"],
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
      question: `What is the best itinerary for a ‘Sunday’ date starting at ${startTime}, lasting for ${duration} hours, based on the current location with latitude ${latitude} and longitude ${longitude}, and considering the attractions and dining options provided in the input data JSON? Please include details such as recommended places to visit, activities to do, and dining options, and ensure the itinerary is optimized for the given day and time.`,
      input_json: JSON.stringify(data),
    });

    return result.output;
  }
}
