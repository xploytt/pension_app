async function generatePensionService(){

    const apiUrl = process.env.REACT_APP_AUTH_ENDPOINT;
    const data = {
        merchantId: process.env.REACT_APP_MERCHANT_ID,
        merchantSecret: process.env.REACT_APP_MERCHANT_SECRET,
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(apiUrl, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        })
        .then((data) => {
    // Handle the response data here
            const {accessToken} = data
            const timestamp = new Date().toString();
            localStorage.setItem('pensionService', JSON.stringify({accessToken, timestamp}))
        })
        .catch((error) => {
            console.error('Error: unable to fetch at the moment..');
        });
}

export default generatePensionService;