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
      </li>
    </ul>
  </div>
</template>
