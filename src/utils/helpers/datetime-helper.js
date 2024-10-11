function compareTime(timeString1, timeString2){
    let dateTime1 = new Date(timeString1);
    let dateTime2 = new Date(timeString2);
    console.log("time 1",dateTime1.getTime());
    console.log("time 2",dateTime2.getTime());
    return dateTime1.getTime() < dateTime2.getTime();
}

module.exports={
    compareTime
}