import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const API_ENDPOINT =
  `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&api_key=${process.env.LASTFM_API_KEY}&format=json&nowplaying=true&limit=10`;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data.recenttracks.track)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
};
