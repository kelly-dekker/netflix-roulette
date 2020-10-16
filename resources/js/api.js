import axios from 'axios'

export const HTTP = axios.create({
    method: 'GET',
    url: process.env.MIX_API_URL,
    params: {t: 'genres'},
    headers: {
        'x-rapidapi-host': process.env.MIX_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.MIX_RAPIDAPI_KEY
    },
});
