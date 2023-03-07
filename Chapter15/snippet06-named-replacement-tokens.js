const rex = /^(?<year>\d{2}|\d{4})[-\/](?<month>\d{1,2})[-\/](?<day>\d{1,2})$/;
const str = "2019-02-14".replace(rex, "$<day>/$<month>/$<year>");
console.log(str);   // "14/02/2019"
