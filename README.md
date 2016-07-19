# eslint-bamboo-formatter
[![view on npm](http://img.shields.io/npm/v/eslint-bamboo-formatter.svg?style=flat)](https://www.npmjs.org/package/eslint-bamboo-formatter)

> A reporter for jest which produces a report compatible with Atlassian Bamboo Mocha Test Parser. Forked from [eslint-bamboo-formatter
](https://github.com/voidberg/eslint-bamboo-formatter)

## Installation

```sh
npm install jest-bamboo-formatter
```

## Usage

In the jest config file add the path to the module. For example.

```json
{
    "testResultsProcessor": "node_modules/jest-bamboo-formatter"
}
```

then run jest (or a `npm run` command) with the path to the config file

```sh
    jest --config=./config/jest.config.json
```

### Output

By default, the reporter writes to `jest.json`. The file name can be changed by setting the `JEST_FILE` environment variable.

## License

[MIT](https://github.com/adalbertoteixeira/jest-bamboo-formatter/blob/master/LICENSE)
