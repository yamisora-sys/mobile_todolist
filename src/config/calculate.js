export function DiffMinutes(date1, date2) {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


export function DiffMinutesFromNow(date) {
    let time = new Date(date);
    let diff = (new Date().getTime() - time.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

export function DiffSecondsFromNow(date) {
    let time = new Date(date);
    let diff = (new Date().getTime() - time.getTime()) / 1000;
    return Math.round(diff);
}