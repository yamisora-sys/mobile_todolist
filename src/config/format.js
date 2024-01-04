

export const FormatDateTime = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export const getTime = (date) => {
    let d = new Date(date);
    let hour = d.getHours();
    let minute = d.getMinutes();
    return `${hour}:${minute}`;
}

export const getDate = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

export const FormatDatetimeDMYHM = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`;
}

// convert 20-10-2021 to 2021-10-20
export const convertDate = (date) => {
    let d = date.split('-');
    return `${d[2]}-${d[1]}-${d[0]}`;
}