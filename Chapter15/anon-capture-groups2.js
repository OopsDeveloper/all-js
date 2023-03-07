const usDateRex =
    /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
const yearFirstDateRex =
    /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/;
function parseDate(dateStr) {
    let year, month, day;
    let parts = yearFirstDateRex.exec(dateStr);
    if (parts) {
        year  = +parts[1];
        month = +parts[2] - 1;
        day   = +parts[3];
    } else {
        parts = usDateRex.exec(dateStr);
        if (parts) {
            year  = +parts[3];
            month = +parts[1] - 1;
            day   = +parts[2];
        }
    }
    if (parts && !isNaN(year) && !isNaN(month) && !isNaN(day)) {
        if (year < 50) {
            year += 2000;
        } else if (year < 100) {
            year += 1900;
        }
        return new Date(year, month, day);
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
