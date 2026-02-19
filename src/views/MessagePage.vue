<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Message, MessageType } from '@/types/Message'
import { messageService } from '@/services/messageService'

const messages = ref<Message[]>([])
const loading = ref<boolean>(false)

const selectedType = ref<MessageType | 'all'>('all')

const fetchMessages = async () => {
  loading.value = true
  try {
    messages.value = await messageService.getMessages()
  } finally {
    loading.value = false
  }
}

const filteredMessages = computed(() => {
  if (selectedType.value === 'all') {
    return messages.value
  }

  return messages.value.filter((message) => message.type === selectedType.value)
})

const newMessage = ref<Message>({
  subject: '',
  message: '',
  date: '',
  senderName: '',
  type: 'incoming',
})

const createMessage = async () => {
  if (!newMessage.value.subject || !newMessage.value.message) {
    return
  }

  await messageService.createMessage(newMessage.value)

  newMessage.value = {
    subject: '',
    message: '',
    date: '',
    senderName: '',
    type: 'incoming',
  }

  await fetchMessages()
}

const deleteMessage = async (id?: number) => {
  if (!id) return

  await messageService.deleteMessage(id)
  await fetchMessages()
}

watch(selectedType, (newValue) => {
  console.log('Filter changed to:', newValue)
})

onMounted(() => {
  fetchMessages()
})
</script>

<template>
  <div>
    <h1>Messages</h1>

    <h2>Create Message</h2>

    <div>
      <input v-model="newMessage.subject" placeholder="Subject" />
      <input v-model="newMessage.message" placeholder="Message" />
      <input v-model="newMessage.date" type="datetime-local" />
      <input v-model="newMessage.senderName" placeholder="Sender name" />

      <select v-model="newMessage.type">
        <option value="incoming">Incoming</option>
        <option value="outgoing">Outgoing</option>
        <option value="task">Task</option>
      </select>

      <button @click="createMessage">Create</button>
    </div>

    <hr />

    <label>
      Filter by type:
      <select v-model="selectedType">
        <option value="all">All</option>
        <option value="incoming">Incoming</option>
        <option value="outgoing">Outgoing</option>
        <option value="task">Task</option>
      </select>
    </label>

    <div v-if="loading">Loading...</div>

    <ul v-else>
      <li v-for="message in filteredMessages" :key="message.id">
        {{ message.subject }} - {{ message.type }}
        <button @click="deleteMessage(message.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
