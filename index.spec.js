var fs = require('fs');
var sinon = require('sinon');
var jestBambooReporter = require('./index');

describe('jest-bamboo-reporter2', function () {
  var jestOutput = JSON.parse(fs.readFileSync(__dirname + '/test-files/jest-output.json', 'utf8'));
  var clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date('2016-08-18T12:00:55.242Z'));
  });

  afterEach(function () {
    clock.restore();
    fs.unlinkSync('./test-report.json');
  });

  it('should create the expected result', function () {
    jestBambooReporter(jestOutput);
    var actualResult = JSON.parse(fs.readFileSync('./test-report.json', 'utf8'));
    var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/test-files/expected-result.json', 'utf8'));

    expect(actualResult).toEqual(expectedResult);
  });

  it('should use suite name template', function () {
    try {
      process.env.JEST_BAMBOO_SUITE_NAME = '{fileNameWithoutExtension}';
      jestBambooReporter(jestOutput);
      var actualResult = JSON.parse(fs.readFileSync('./test-report.json', 'utf8'));
      var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/test-files/expected-result-with-filename.json', 'utf8'));
      
      expect(actualResult).toEqual(expectedResult);
    } finally {
      delete process.env.JEST_BAMBOO_SUITE_NAME;
    }
  });
});
