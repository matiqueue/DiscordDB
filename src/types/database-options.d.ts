import Bot from '../core/bot'

export type ProviderType = 'default' | 'custom'

export interface DefaultProviderOptions {
  serverId: string
  provider: 'default'
}

export interface CustomProviderOptions {
  serverId: string
  provider: 'custom'
  botProvider: Bot
}

export type DatabaseOptions = DefaultProviderOptions | CustomProviderOptions
