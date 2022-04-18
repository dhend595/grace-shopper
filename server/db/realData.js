const app = require('../app');
const axios = require('axios');
const res = require('express/lib/response');

const sampleData = async (release) => {
  try {
    const response = (
      await axios.get(`https://api.discogs.com/releases/8928025`)
    ).data;
    // console.log(response);
    const album = {
      //format included for sorting purposes
      format: response.formats[0].name,
      albumName: response.title,
      albumArt: 'authorization required',
      artistName: response.artists[0].name,
      genre: response.genres[0],
      style: response.styles[0],
      year: response.year,
      price: response.lowest_price,
      albumDetails: response.notes,
      trackList: response.tracklist.map((x) => {
        return { track: x.position, title: x.title };
      }),
      rating: response.community.rating.average,
      availableInventory: response.num_for_sale,
    };
    console.log(album);
  } catch (error) {
    console.log(error.code);
  }
};

const getAlbumDetails = async (artist, title) => {
  try {
    const searchResults = await axios.get(
      `https://api.discogs.com/database/search?q=artist=${artist}&title=${title}&key=${process.env.DISCOGS_KEY}&secret=${process.env.DISCOGS_SECRET}`
    );
    const response = (
      await axios.get(searchResults.data.results[0].resource_url)
    ).data;
    // console.log(response);
    const album = {
      //format included for sorting purposes
      format: response.formats[0].name,
      albumName: response.title,
      albumArt: searchResults.data.results[0].cover_image,
      artistName: response.artists[0].name,
      genre: response.genres[0],
      style: response.styles[0],
      year: response.year,
      price: response.lowest_price,
      albumDetails: response.notes,
      trackList: response.tracklist.map((x) => {
        return { track: x.position, title: x.title };
      }),
      rating: response.community.rating.average,
      availableInventory: response.num_for_sale,
    };
    console.log('--within trycatch--', album);
    return album;
  } catch (error) {
    console.log(error);
  }
};

console.log(getAlbumDetails('The Clash', 'London Calling'));

const realData = getAlbumDetails('The Clash', 'London Calling');

module.exports = realData;
