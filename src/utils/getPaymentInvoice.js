import getToken from "./accessToken";

const generatePaymentInvoice = async(scheduleId) => {
    const apiUrl = process.env.REACT_APP_GET_INVOICE;
    const bearerToken = await getToken();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const raw = JSON.stringify({
      "merchantId": process.env.REACT_APP_MERCHANT_ID,
      "scheduleId": scheduleId
    });

    var requestOptions = {
     method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
  }


// fetch(apiUrl, requestOptions)
//   .then(async response => await response.json())
//   .then(result => {
//     console.log(result)
//     // console.log(result.json())
//     return result})
//   .catch(error => {
//     console.error('Error:', error);
//     throw error
// });
}


export default generatePaymentInvoice