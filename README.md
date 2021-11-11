# donothing

Node.js donothing framework inspired by Dan Slimmon's blog post on [Do-nothing scripting](https://blog.danslimmon.com/2019/07/15/do-nothing-scripting-the-key-to-gradual-automation/).

This library is not a direct translation of Dan Slimmon's [go framework](https://github.com/danslimmon/donothing).

Collection of console-focused helper functions to organize scripts by procedures, steps, text, code, amd prompts.

## Usage

```bash
# npm
npm i @michalekplai/donothing
# yarn
yarn add @michalekplai/donothing
# pnpm
pnpm i @michalekplai/donothing
```

Procedure to create a new Ubuntu user with sudo privileges. Adapted from https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04

```js
// doNothing.js

const { Procedure } = require('@michalekplai/donothing')

;(async () => {
  const pcd = new Procedure()

  pcd.step('Creating a New User')
  const newUser = await pcd.prompt(
    'Enter a username for the new user:',
    'NEW_USER'
  )
  pcd.text('Run the following command:')
  pcd.code(`sudo adduser ${newUser}`)

  pcd.step('Granting Administrative Privileges')
  pcd.text('Run the following command:')
  pcd.code(`sudo usermod -aG sudo ${newUser}`)

  pcd.done() // Don't forget to call this when you're done!
})()
```

Run the script using:

```
node doNothing.js
```

## Procedure

Procedures are logical collections of steps. New collections will reset step numbering. Notice that you must call `done()` when you're done with a procedure.

## Steps, Text, Code

The step, text, and code method are all methods to output text to the console. Each method has a distinct appearance to make console output more readable.

## Input/Output (Prompts)

User input can be requested using the `prompt(prompt: string, envVar = '')` method. The prompt method also accepts an optional second parameter which is the name of an environment variable to use for the value when user input is not available (CI/CD environments).

## TODO

- ESLint
- Automate publish
- Add Unit Tests
