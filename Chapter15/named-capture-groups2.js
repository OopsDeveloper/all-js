const usDateRex =
    /^(?<month>\d{1,2})[-\/](?<day>\d{1,2})[-\/](?<year>\d{4})$/;
const yearFirstDateRex =
    /^(?<year>\d{4})[-\/](?<month>\d{1,2})[-\/](?<day>\d{1,2})$/;
function parseDate(dateStr) {
    const parts = yearFirstDateRex.exec(dateStr) || usDateRex.exec(dateStr);
    if (parts) {
        let year  = +parts.groups.year;
        let month = +parts.groups.month - 1;
        let day   = +parts.groups.day;
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            if (year < 50) {
                year += 2000;
            } else if (year < 100) {
                year += 1900;
            }
            return new Date(year, month, day);
        }
    }
    return null;
}
function test(str) {
    let result = parseDate(str);
    console.log(result ? result.toISOString() : "invalid format");
}

test("12/25/2019"); // Parses; shows date
test("2019-12-25"); // Parses; shows date
test("12/25/19");   // Doesn't parse; shows "invalid format"
