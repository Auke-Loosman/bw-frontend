export type MessageType = 'incoming' | 'outgoing' | 'task'

export interface Message {
  id?: number
  subject: string
  message: string
  date: string
  senderName: string
  processedAt?: string | null
  handler?: string | null
  type: MessageType
}
