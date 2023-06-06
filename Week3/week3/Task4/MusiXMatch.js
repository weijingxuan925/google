const axios = require('axios');

// MusiXMatch API key
const API_KEY = '9b9544a156347646e89e66811bf50797';

// 根据艺术家、标题和专辑获取歌词
async function getLyrics(artist, title, album) {
  try {
    const response = await axios.get('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get', {
      params: {
        format: 'json',
        callback: 'callback',
        q_track: title,
        q_artist: artist,
        q_album: album,
        apikey: API_KEY
      }
    });

    if (response.data.message.body.lyrics) {
      return response.data.message.body.lyrics.lyrics_body;
    } else {
      return 'Lyrics not found';
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return 'Error fetching lyrics';
  }
}

getLyrics('周杰伦', '七里香', 'album').then((lyrics) => console.log(lyrics));
