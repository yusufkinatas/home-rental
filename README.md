# Rental Home

A full-stack mobile application that lets users & realtors to find and create apartments. Developed with React Native, Express.js, MongoDB, Typescript.

<p float="left">
 <img src="https://user-images.githubusercontent.com/39553853/132986551-af8e5a21-d606-49c2-9ab1-aaa4509a2881.png" width="225" />
 <img src="https://user-images.githubusercontent.com/39553853/132986553-eec2882c-0a92-44d9-a38d-d94b4cd5e4e6.png" width="225" />
</p>


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
#### Expected output if database is seeded with seed data
<img src="https://user-images.githubusercontent.com/39553853/132986488-23df9abd-72c9-4946-99de-20b8361b55db.png" width="375" />
