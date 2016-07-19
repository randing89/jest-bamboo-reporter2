function format(result) {
  var formatted = '';
  var msg = [];
  var counter = 1;

  if (result.length === 1) {
    formatted = '1 failure: \n';
  } else {
    formatted = result.length + ' failures: \n';
  }

  result.forEach(function iterator(message, index) {
    msg.push((index + 1) + ' failed: ' + message);
    counter++;
  });

  formatted += msg.join('\n');

  return formatted;
}

module.exports = {
  format: format,
};
