import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatsService {

    async getRecommendation(data: any) {
        const response = await axios.post(`${process.env.LLM_API_URL}/gemini/chat`, {
            data,
        });
        return response.data;
    }
}
