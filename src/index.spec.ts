import { Procedure } from './index'

describe('procedure tests', () => {
  test('text', () => {
    const pcd = new Procedure()
    pcd.text('Test')
  })
})
