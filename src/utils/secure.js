export const checkDataIsValid = (data) => {
    if(data !== null && data !== undefined && data !== ''){
        return true;
    }
    return false;
}

export const calAmountFromPercent = (percent, amount) => {
    let percentAmount = 0;
    if( checkDataIsValid(percent) && checkDataIsValid(amount) ){
        percentAmount = parseFloat((parseFloat(percent) / 100) * parseFloat(amount)).toFixed(2);
    }
    return percentAmount;
}