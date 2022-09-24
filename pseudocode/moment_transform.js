// moment js transformer

const moment = require('moment');

// const reserveDate = date just
// const time = 0000 format

// const db format = 2022-09-23T01:50:33.455Z'

 const d = new Date("2015-03-25"); 
console.log( new Date());
console.log("DDD is", d)

const added =  moment(d).add(7, 'minutes').add(1, 'hour').utc()

console.log("added ", added )