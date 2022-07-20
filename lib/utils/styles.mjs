import chalk from 'chalk'

chalk.enabled = process.env.NODE_ENV !== 'test'

export const successStyle = chalk.green
export const warningStyle = chalk.yellow
export const errorStyle = chalk.red
export const highlightStyle = chalk.cyan
export const headingStyle = chalk.cyan.bold
export const codeStyle = chalk.dim
export const pathStyle = chalk.cyan.underline
export const pathTextStyle = chalk.blue
export const blockQuoteStyle = chalk.magenta.italic
export const htmlStyle = chalk.green
