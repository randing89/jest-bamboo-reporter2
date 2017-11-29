var fs = require('fs');
var sinon = require('sinon');
var jestBambooReporter = require('./index');

describe('jest-bamboo-reporter', function () {
  var jestOutput = JSON.parse(fs.readFileSync(__dirname + '/test-files/jest-output.json', 'utf8'));
  var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/test-files/expected-result.json', 'utf8'));
  var actualResult;
  var clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date('2016-08-18T12:00:55.242Z'));
    jestBambooReporter(jestOutput);
    actualResult = JSON.parse(fs.readFileSync('./test-report.json', 'utf8'));
  });

  afterEach(function () {
    clock.restore();
    fs.unlinkSync('./test-report.json');
  });

  it('should create the expected result', function () {
    expect(actualResult).toEqual(expectedResult);
  })

});
