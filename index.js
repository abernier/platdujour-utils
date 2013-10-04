//
// '-08:00' -> -480 (minutes)
//

function parseTimezoneOffset(str) {
  // ±[hh]:[mm], ±[hh][mm], or ±[hh] (see: http://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC)
  var matches = str.match(/([+-])(0[0-9]|1[0-2])([:]?([0-5][0-9]))?$/);
  if (!matches) {
    throw new Error('Invalid timezone offset');
  }
  var sign = (matches[1] === '+' ? 1 : -1);
  var hours = +matches[2];
  var minutes = +matches[4] || 0;

  return sign * hours*60 + minutes;
}

exports.dujour = function (date, now) {
  now = new Date(now);
  if (now.toString() === 'Invalid Date') {
    now = new Date();
  }

  var offset = 0;
  try {
    offset = parseTimezoneOffset(date); // in minutes
  } catch(e) {}

  var nowLocal = new Date(now.getTime() + offset*60*1000); // now + offset

  return nowLocal.toISOString().split('T')[0] === date.split('T')[0];
}