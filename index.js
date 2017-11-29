var fs = require('fs');
var EOL = require('os').EOL;

var filename = process.env.JEST_REPORT_FILE || 'test-report.json';

var output = {
  stats: {},
  failures: [],
  passes: [],
  skipped: []
};

module.exports = function reporter(results) {
  output.stats.tests = results.numTotalTests;
  output.stats.passes = results.numPassedTests;
  output.stats.failures = results.numFailedTests;
  output.stats.duration = Date.now() - results.startTime;
  output.stats.start = new Date(results.startTime);
  output.stats.end = new Date();

  var existingTestTitles = Object.create(null);

  results.testResults.forEach(function (suiteResult) {
    suiteResult.testResults.forEach(function (testResult) {
      var suiteName = replaceCharsNotSupportedByBamboo(testResult.ancestorTitles[0] || suiteResult.testFilePath);
      var testTitle = replaceCharsNotSupportedByBamboo([...testResult.ancestorTitles, testResult.title].join(' – '));

      if (testTitle in existingTestTitles) {
        var newTestTitle;
        var counter = 1;
        do {
          counter++;
          newTestTitle = testTitle + ' (' + counter + ')';
        } while (newTestTitle in existingTestTitles);
        testTitle = newTestTitle;
      }

      existingTestTitles[testTitle] = true;

      var result = {
        title: testTitle,
        fullTitle: suiteName,
        duration: suiteResult.perfStats.end - suiteResult.perfStats.start,
        errorCount: testResult.failureMessages.length,
        error: testResult.failureMessages.length ? formatErrorMessages(testResult.failureMessages) : undefined
      };

      switch (testResult.status) {
        case 'passed':
          output.passes.push(result);
          break;
        case 'failed':
          output.failures.push(result);
          break;
        case 'pending':
          output.skipped.push(result);
          break;
        default:
          throw new Error('Unexpected test result status: ' + testResult.status);
      }
    });
  });

  fs.writeFileSync(filename, JSON.stringify(output, null, 2), 'utf8');
  return results;
};

function replaceCharsNotSupportedByBamboo(s) {
  return s.replace(/\./g, '_');
}

function formatErrorMessages(errorMessages) {
  var lines = [];

  if (errorMessages.length === 1) {
    lines.push('1 failure:');
  } else {
    lines.push(errorMessages.length + ' failures:');
  }

  errorMessages.forEach(function (message) {
    lines.push('* ' + message);
  });

  return lines.join(EOL);
}
