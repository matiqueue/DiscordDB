// src/utils/logger.ts

export function log(...args: string[]): void {
  console.log('[DiscordBase]', ...args)
}

export function error(...args: string[]): void {
  console.error('[DiscordBase ERROR]', ...args)
}
