import axios from 'axios';
import { RAPID_API_KEY } from './sentimentapi.config';

export const getReviewSentiment = async (text: string) => {
    const options: any = {
        method: 'POST',
        url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
        headers: {
            'Content-type': 'application/json',
            'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
            'x-rapidapi-key': RAPID_API_KEY
        },
        data: {
            language: 'english',
            text: text
        }
    };
    return await axios
        .request(options)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};
