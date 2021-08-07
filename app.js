const moment = require("moment-timezone");

function shiftDate(date, diff) {
  return new Date(date.getTime() + diff);
}
const date_diff = 3_600_000;
const d = 1628255700000 + 17 * date_diff;

// const timezone = "America/Los_Angeles";
const timezone = "America/New_York";

console.log('original date', moment(d).tz(timezone).format())

// const d1 = moment(d).tz(timezone).utc(true).toDate();

// const new_date = shiftDate(d1, date_diff);

// console.log(d1, new_date);

// const m2 = moment(new_date);

// console.log(m2.format());
// const formatted = m2.format("YYYY-MM-DDTHH:mm");
// console.log(formatted);

// const new_Date = moment.tz(formatted, timezone).format();
// console.log(new_Date);

// const n_Date = moment.tz(moment(new_date).format("YYYY-MM-DDTHH:mm"), timezone).toDate();
// console.log(n_Date);

// console.log(d)

const original_date_at_utc_midnight = moment(d).tz(timezone).utc(true).startOf("day").valueOf();
const d_1 = new Date(original_date_at_utc_midnight);
console.log(d_1)
console.log(d_1.getTime())

