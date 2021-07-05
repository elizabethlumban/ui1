# React Redux Starter Project

Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This boilerplate configures and demonstrates:

- [Redux](http://redux.js.org/);
- [Material UI](http://www.material-ui.com/#/) components;
- [Redux Promises Middleware](https://github.com/pburtchaell/redux-promise-middleware);

## Overview

## Development use

Then you need to set-up and start the app:

```bash
# Installs the Node version defined in .nvmrc
nvm install && npm install

# Runs the app in a hot-swapping mode
npm run start-dev
```

To run the tests:

```bash
npm run test
```

## Production use

To prepare a production build, first we need to build the web resources:

```bash
npm run build
```

Now we can start the app by specifying back end server via `API_ENDPOINT`:

```bash
API_ENDPOINT='server-location' npm start
```
