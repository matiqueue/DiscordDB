export function log(...args: unknown[]): void {
  console.log('[DiscordBase]', ...args)
}

export function error(...args: unknown[]): void {
  console.error('[DiscordBase ERROR]', ...args)
}
