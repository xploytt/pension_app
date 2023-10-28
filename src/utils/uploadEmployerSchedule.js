import getToken from "./accessToken";

const employerScheduleUpload= async ({employerCode, employerName, rsaSchedule, email, phoneDetails}) =>{
    const apiUrl = process.env.REACT_APP_SCHEDULE_UPLOAD;
    const bearerToken = await getToken();
    
    const formData = new FormData();
    formData.append('merchantId', process.env.REACT_APP_MERCHANT_ID);
    formData.append('employerName', employerName);
    formData.append('employerCode', employerCode);
    formData.append('employerEmail', email);
    formData.append('employerPhone', phoneDetails);
    formData.append('rsaSchedule', rsaSchedule);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        body: formData,
    };

    return fetch(apiUrl, requestOptions)
        .then(async (response) => await response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

export default employerScheduleUpload