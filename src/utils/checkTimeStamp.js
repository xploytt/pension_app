function isTimestampWithinOneHour(timestampString) {
  const oneHourInMilliseconds = 60 * 60 * 1000; 
  const currentTimestamp = new Date().getTime(); 

  const targetTimestamp = new Date(timestampString).getTime();

  return currentTimestamp - targetTimestamp <= oneHourInMilliseconds;
}

  export default isTimestampWithinOneHour;