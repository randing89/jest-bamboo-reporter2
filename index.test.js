var fs = require('fs');
var test = require('tape');
var moment = require('moment');
var jestBambooReporter = require('./index');

test('Test ouput produces the expected result', function (t) {
  var jestTestsResult = JSON.parse(fs.readFileSync(__dirname + '/test-files/jest-tests-result.json', 'utf8'));
  var jestTestsExpectedResults = JSON.parse(fs.readFileSync(__dirname + '/test-files/expected-results.json', 'utf8'));
  var formatterResult = jestBambooReporter(jestTestsResult);

  t.equal(jestTestsResult, formatterResult);

  var jestReporterResult = JSON.parse(fs.readFileSync('./test-report.json', 'utf8'));
  t.equal(jestReporterResult.stats.tests, jestTestsExpectedResults.stats.tests, 'Expect total count of test to have the correct number');
  t.equal(jestReporterResult.stats.passes, jestTestsExpectedResults.stats.passes, 'Expect total count of passed tests to have the correct number');
  t.equal(jestReporterResult.stats.failures, jestTestsExpectedResults.stats.failures, 'Expect total count of failed tests to have the correct number');
  t.equal(moment(jestReporterResult.stats.duration).isValid(), true, 'Expect duration to be a number');
  t.equal(moment(jestReporterResult.stats.start).isValid(), true, 'Expect start date to be a date');
  t.equal(moment(jestReporterResult.stats.end).isValid(), true, 'Expect end date to be a date');

  t.equal(jestReporterResult.failures.length, jestTestsExpectedResults.failures.length, 'Expect failures object length to have the correct number.');
  t.equal(jestReporterResult.passes.length, jestTestsExpectedResults.passes.length, 'Expect passes object length to have the correct number.');
  t.equal(jestReporterResult.skipped.length, jestTestsExpectedResults.skipped.length, 'Expect skipped object length to have the correct number.');

  fs.unlink('./test-report.json');

  t.end();
});
