"use server"
const API_KEY = process.env.API_KEY_OF_OPEN_ROUTE_SERVICE;

export const fetchDirections = async (coordinates: [number, number][]) => {
  if (!API_KEY) {
    throw new Error('API key is missing');
  }
  console.log(8)
  const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
    method: 'POST',
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates,
    }),
  });
  console.log(response, 19)

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
