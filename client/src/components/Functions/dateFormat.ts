import {useState} from 'react'

const changeDateFormat = (date : string) =>{
    var mydate = new Date(date);
    var day = mydate.getDate();
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
    var str = day + ' '+  month + ' ' + mydate.getFullYear();

    return str;


}
export {changeDateFormat};