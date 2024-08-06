// pages/api/search.js
import axios from 'axios';

export default async function handler(req, res) {
  const { q } = req.query;

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        format: 'json',
        q,
      },
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location data' });
  }
}
