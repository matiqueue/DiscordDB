export function log(...args: unknown[]): void {
  console.log('[DiscordDB]', ...args)
}

export function logError(...args: unknown[]): void {
  console.error('[DiscordDB ERROR]', ...args)
}
