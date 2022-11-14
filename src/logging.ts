import chalk from 'chalk'

export const error = (str: string) => console.log(chalk.bold.red(str))
export const warning = (str: string) => console.log(chalk.hex('#FFA500')(str))
export const info = (str: string) => console.log(chalk.cyan(str))
export const success = (str: string) => console.log(chalk.green(str))