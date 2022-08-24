# LendsQR Test

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6e057888e4234d5fae98d01aeb23da08)](https://www.codacy.com/gh/gthankgod/howold/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gthankgod/howold&utm_campaign=Badge_Grade) [![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE)

<hr/>

## Getting Started

### Prerequisites

The recommended way to use this service is programmatically fetching from the resource or using an API client source like postman, thunderclient e.t.c.

The base url is `https://lendsqr-test-ng.herokuapp.com`

The easiest way to using the feature is by calling the API GET resource via the terminal for a health check:

```sh
curl --location --request GET 'https://lendsqr-test-ng.herokuapp.com'
```

### Usage

#### Register New User

```js
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:3000/v1/auth/register',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "g@gmail.com",
    "password": "12345",
    "name": "Tgee"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

#### Login

```js
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:3000/v1/auth/login',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "g@gmail.com",
    "password": "12345"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

#### Wallet - Check Balance

```Nodejs

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:3000/v1/wallets/balance',
  'headers': {
    'x-auth-token': ''
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
; // returns 38
```

#### Fund Account

```Nodejs
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:3000/wallets/fund',
  'headers': {
    'x-auth-token': '1234566774545',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": 480,
    "cardNumber": "1212121212121212"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```




#### Withdraw Account

```Nodejs
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:3000/v1/wallets/withdraw',
  'headers': {
    'x-auth-token': '1234566774545',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": 480
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


```

#### Transfer Account to another Account

```Nodejs
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:3000/v1/wallets/transfer',
  'headers': {
    'x-auth-token': '1234566774545',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "amount": 480,
    "recipientAccountNumber": "12"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## License

Copyright (c) 2022 ThankGod George
Licensed under the MIT license.
