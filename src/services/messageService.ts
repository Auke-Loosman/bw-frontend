import axios from 'axios'
import type { Message } from '@/types/Message'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export const messageService = {
  async getMessages(): Promise<Message[]> {
    const response = await api.get<Message[]>('/messages')
    return response.data
  },

  async getMessage(id: number): Promise<Message> {
    const response = await api.get<Message>(`/messages/${id}`)
    return response.data
  },

  async createMessage(message: Message): Promise<Message> {
    const response = await api.post<Message>('/messages', message)
    return response.data
  },

  async updateMessage(id: number, message: Message): Promise<Message> {
    const response = await api.put<Message>(`/messages/${id}`, message)
    return response.data
  },

  async deleteMessage(id: number): Promise<void> {
    await api.delete(`/messages/${id}`)
  },
}
