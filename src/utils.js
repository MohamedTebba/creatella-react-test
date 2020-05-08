
export const handleScroll = () => {
    const innerHeight =  window.innerHeight,
          listBottomPosition = Math.round(document.querySelector('.products').getBoundingClientRect().bottom)
    return innerHeight >= listBottomPosition? true : false
}

/**handelAdsShow is to prevent same ads in a row */
export const handleAdsShwo = (previousRandomNbr) => {
    let randomNb = Math.floor(Math.random()*1000),
    /**I used same method used in the ads handler middleware because as I noticed
     * random number is not enoough, 200 or 300 will give me 1 in a row
    */
        formatedGeneratedNbr = parseInt(randomNb, 10)%10+1,
        formatedStoredNbr = parseInt(previousRandomNbr, 10)%10+1
    while(formatedGeneratedNbr === formatedStoredNbr){
        randomNb = Math.floor(Math.random()*1000)
        formatedGeneratedNbr = parseInt(randomNb, 10)%10+1
    }
    return randomNb
}

/**format the dates */
export const dateFormatter = (date) => {
    const convertedDate = new Date(date),
         timeInMilleSeconds = convertedDate.getTime(),
        timeHasPassed = (Date.now()-timeInMilleSeconds) / 1000,
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
         days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
         fullDate=`${days[convertedDate.getDay()]} ${months[convertedDate.getMonth()]} ${convertedDate.getDate()} ${convertedDate.getFullYear()}`
    return `${
        Math.round(timeHasPassed / 86400)
            ? `${
            Math.round(timeHasPassed / 86400) > 1 && Math.round(timeHasPassed / 86400) <= 7
                ? `${Math.round(timeHasPassed / 86400)} days ago`
                : Math.round(timeHasPassed / 86400) > 7 
                ? fullDate
                : `${Math.round(timeHasPassed / 86400)} day ago`
            }`
            : `${
            Math.round(timeHasPassed / 3600)
                ? `${
                Math.round(timeHasPassed / 3600) > 1
                    ? `${Math.round(timeHasPassed / 3600)} hours ago`
                    : `${Math.round(timeHasPassed / 3600)} hour ago`
                }`
                : `${
                Math.round(timeHasPassed / 60)
                    ? `${
                    Math.round(timeHasPassed / 60) > 1
                        ? `${Math.round(timeHasPassed / 60)} minutes ago`
                        : `${Math.round(timeHasPassed / 60)} minute ago`
                    }`
                    : ""
                }`
            }`
        }`
}