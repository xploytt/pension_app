import getToken from "./accessToken";

const getPfaData = async () => {
  const apiUrl = process.env.REACT_APP_GET_PFA;
  const bearerToken = await getToken();
  
  try {
    const data = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      },
    });

    if (!data.ok) {
      throw new Error(`HTTP error! Status: ${data.status}`);
    }

    const response = await data.json();
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};

export default getPfaData;
