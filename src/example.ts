import { Procedure } from './index'
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
