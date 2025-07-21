
export const createShortLink = async (longUrl, validity, shortcode) => {
  try {
    const response = await fetch('http://localhost:3000/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl, validity, shortcode }),
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to create shortened URL');
  }
};

export const getShortenedLinks = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/links');
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch shortened URLs');
  }
};
