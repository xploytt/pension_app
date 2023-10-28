import getToken from "./accessToken";

async function proccessEmployerDetails(employerCode){
    const apiUrl = process.env.REACT_APP_EMPLOYER_NAME;
    const bearerToken = await getToken();
    const data = {
        employerCode
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
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
            let returnedData = data.data
            if (returnedData.length !== 0) return returnedData[0].employerName
            return ''
        })
        .catch((error) => {
            console.error('Error:', error);
            return ''
        });
}

export default proccessEmployerDetails