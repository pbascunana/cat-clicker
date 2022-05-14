import axios from 'axios';

export const api = {
  async getCatList(limit = 10) {
    const headers = { headers: { 'x-api-key': 'c38a774e-d6d6-4745-9bfc-54b47d52e2ed' } };
    const cats = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, headers);
    return cats;
  }
}