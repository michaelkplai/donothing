import readline from 'readline'

const color = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m', // Can't tell what this does
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m'
}

function colorString(col: keyof typeof color, str: string) {
  return color[col] + str + color.Reset
}
export class Procedure {
  private stepCount = 1
  private rl: readline.Interface

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.rl.on('close', () => process.exit(0))
  }

  step(step: string) {
    const value = colorString('Bright', `\n${this.stepCount}. ${step}`)
    console.log(value)
    this.stepCount++
  }

  text(text: string) {
    console.log(text)
  }

  code(code: string) {
    const value = colorString('FgBlue', `\n    ${code}\n`)
    console.log(value)
  }

  async prompt(prompt: string, envVar = ''): Promise<string> {
    const promptValue = colorString('FgCyan', `${prompt} `)

    if (envVar && process.env[envVar]) {
      console.log(`${promptValue}Populated by environment variable`)
      return process.env[envVar] || ''
    } else {
      return new Promise((resolve) => this.rl.question(promptValue, resolve))
    }
  }

  done() {
    this.rl.close()
  }
}
