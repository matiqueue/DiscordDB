export function logger(message: string): void {
  console.log(`[LOG]: ${message}`)
}

export function error(message: string): void {
  console.error(`[ERROR]: ${message}`)
}

export function warn(message: string): void {
  console.warn(`[WARN]: ${message}`)
}
