export function DiffMinutes(date1, date2) {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


export function DiffMinutesFromNow(date) {
    let diff = (new Date().getTime() - date.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}