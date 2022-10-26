export const dateFormatter = (date) => {

    const YYYY = date.getFullYear()
    let MM = date.getMonth() + 1
    let DD = date.getDate()
    let ss = date.getSeconds()
    let mm = date.getMinutes()
    let hh = date.getHours()

    if (DD < 10) DD = '0' + DD
    if (MM < 10) MM = '0' + MM
    if (ss < 10) ss = '0' + ss
    if (mm < 10) mm = '0' + mm
    if (hh < 10) hh = '0' + hh

    date = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss

    return date
}