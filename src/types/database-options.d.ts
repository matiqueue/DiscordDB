import Bot from '../core/bot'

export type ProviderType = 'default' | 'custom'

export interface DefaultProviderOptions {
  serverId: string
  provider: 'default'
}

export interface CustomProviderOptions {
  serverId: string
  provider: 'custom'
  bot: Bot
}

export type DatabaseOptions = DefaultProviderOptions | CustomProviderOptions
