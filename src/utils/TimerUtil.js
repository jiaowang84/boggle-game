export function formatTimerString(min, sec) {
    let minStr = '', secStr = '';
    if (min < 10) {
        minStr = '0' + min;
    } else {
        minStr = min;
    }
    if (sec < 10) {
        secStr = '0' + sec;
    } else {
        secStr = sec;
    }
    return minStr + ':' + secStr;
}