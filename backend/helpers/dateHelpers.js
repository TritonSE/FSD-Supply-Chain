function zeroPad(value) {
  return value.toString().padStart(2, "0");
}

function toUTCMidnight(date) {
  if (date === undefined) {
    date = new Date();
  }

  return new Date(
    `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
      date.getDate()
    )}`
  );
}

module.exports = { toUTCMidnight };
