# feathers-afp-news

> A feathers service to authenticate users on AFP News API and fetch news

## Installation

```
npm install feathers-afpnews --save
```

### Configuration

```
{
  "afpnews": {
    "apiKey": "AFP_NEWS_API_KEY",
    "storageKey": "afpNews",
    "tokenKey": "token"
  }
}
```

### Initiate the service

In the services directory of your feathers app, initiate the service with config.

```js
const afpNews = require('feathers-afpnews');

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/afpnews', afpNews(app.get('afpnews')));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('afpnews');
};
```

With hooks, you can set up the authentication with the create method, and save the generated token in the user data.

The service is by default looking for the token in the user data, under the `storageKey` configured property.

Another hook can get the refreshed token in the result data, to save it again in the user data.

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
