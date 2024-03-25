# Hive Open Media Web App

## Local Development Setup

Create a file named `.env` in the root directory of the project and add the following contents:

REACT_APP_GOOGLE_DRIVE_CLIENT_ID = (get from a developer)
REACT_APP_GOOGLE_DRIVE_API_KEY = (get from a developer)
ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = true

```
`npm i`
or
`npm i --force --legacy-peer-deps`

`npm run build`

`npm run start`

http://localhost:3000/

(Refresh the page if it's not showing Google Login)
```

## Linting Auto-fix All Files

`npx prettier --write .`
