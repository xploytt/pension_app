import generatePensionService from "./setPensionService";
import isTimestampWithinOneHour from "./checkTimeStamp";

async function getToken(){
    let pensionService = JSON.parse(localStorage.getItem('pensionService'))

            if (!pensionService || !pensionService.accessToken) {
                await generatePensionService();
                pensionService = JSON.parse(localStorage.getItem('pensionService'));
          } else {
            const pfaTimeStamp = pensionService.timeStamp;
            console.log(!isTimestampWithinOneHour(pfaTimeStamp))
            if (isTimestampWithinOneHour(pfaTimeStamp)) {
                await generatePensionService();
                pensionService = JSON.parse(localStorage.getItem('pensionService'));
            }
          }

        let returnedToken
        if (pensionService) {
          const {accessToken} = pensionService
          returnedToken = accessToken
        }else{
          returnedToken = ''
        }
        return returnedToken
        
}

export default getToken