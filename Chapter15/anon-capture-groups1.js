const usDateRex =
    /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
function parseDate(dateStr) {
    const parts = usDateRex.exec(dateStr);
    if (parts) {
        let year  = +parts[3];
        let month = +parts[1] - 1;
        let day   = +parts[2];
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
test("2019/25/12"); // Doesn't parse; shows "invalid format"
