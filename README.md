# Rental Home

A full-stack mobile application that lets users & realtors to find and create apartments. Developed with React Native, Express.js, MongoDB, Typescript.

## Running the server

In `server/` folder rename `example.env` to `.env`. Only necessary change in env variables is passing a valid MongoDB connection string to `MONGODB_URI`

After env setup, run these commands:

```bash
$ cd server
$ yarn install
$ yarn start
```

## Running the app

In `client/` folder rename `example.env` to `.env`. Only necessary change in env variables is passing a valid key to `GOOGLE_PLACES_API_KEY`. And billing needs to be enabled on google cloud project. Otherwise, address search & reverse geolocation on the map will be disabled.

After env setup, run these commands:

```bash
$ cd client
$ yarn install
$ yarn start
```

## Adding seed data to database

```bash
$ cd server
$ yarn seed
```

Seed data includes following:
- 500 random apartments in Boston, MA
- 100 random users
- Predefined users (email - password)
  - `client@gmail.com` - `123123`
  - `realtor@gmail.com` - `123123`
  - `admin@gmail.com` - `123123`

## Running e2e tests (macOS only)

1. Set up `Detox` globally

```bash
$ xcode-select --install
$ brew tap wix/brew
$ brew install applesimutils
$ npm install -g detox-cli
```
2. Run tests using `Detox`

```bash
$ cd client
$ detox test
```
Expected output if database is seeded with seed data:
