export type TextTask = {
  text: string
}

export type HeadingTask = {
  heading: string
}

export type CodeTask = {
  code: string
  codeLng: string
}

export type Prompt = {
  prompt: string
  promptVar: string
}

export class Procedure {
  private stepCount = 1
  private tasks: (HeadingTask | TextTask | CodeTask | Prompt)[] = []
  private context: Record<string, string> = {}

  heading(heading: string) {
    this.tasks.push({ heading })
  }

  text(text: string) {
    this.tasks.push({ text })
  }

  code(code: string, codeLng = '') {
    this.tasks.push({ code, codeLng })
  }

  prompt(prompt: string, promptVar: string) {
    this.tasks.push({ prompt, promptVar })
  }

  async exec(): Promise<void> {
    for (const task of this.tasks) {
      if ('heading' in task) {
        // TODO add bold
        console.log(`${this.stepCount}. ${task.heading}\n`)
        this.stepCount++
      } else if ('text' in task) {
        console.log(task.text)
      } else if ('code' in task) {
        // TODO figure out how to display copy and pasteable text
        console.log(`\`\`\`${task.codeLng}\n${task.code}\n\`\`\``)
      } else if ('prompt' in task) {
        const input = await inquirer.prompt([
          {
            type: 'input',
            name: task.promptVar,
            message: task.prompt
          }
        ])
        this.context[task.promptVar] = input[task.promptVar]
      }
      this.stepCount++
    }
  }

  render() {}
}
