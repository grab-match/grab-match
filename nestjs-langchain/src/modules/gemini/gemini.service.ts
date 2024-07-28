import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

require("dotenv").config()

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json"
    }
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

@Injectable()
export class GeminiService {

    async startChat(data: any): Promise<any> {
        let dataChat = data.map(el => {
            if (el.sender == "Jennie") {
                return `My Crush : ${el.text};`
            }
            return `Me : ${el.text};`
        });
        let listChat = dataChat.join("\n");
        const chatSession = model.startChat({
            generationConfig,
            // safetySettings: Adjust safety settings
            // See https://ai.google.dev/gemini-api/docs/safety-settings
            history: [],
        });

        let prompt = `
          Gemini AI kamu membantu seseorang untuk saling berbicara yaa, tolong langsung berikan 1 pendapat saja sebagai peran utama user kita (Me). 
          
          User : Hai bantu aku (Me) untuk memberikan chat menarik untuk dia (My Crush) berdasarkan skenario chat ini :
          ${listChat}
        
          Oya untuk berbicara dengan My Crush gunakan "Aku-Kamu" yaaa
          `
        const result = await chatSession.sendMessage(prompt);

        if (!result.response) {
            return "Gemini AI tidak bisa memberikan jawaban untuk chat ini";
        }

        return result.response.candidates[0].content.parts[0].text;
    }
}
