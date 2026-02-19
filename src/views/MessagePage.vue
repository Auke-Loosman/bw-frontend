<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Message } from '@/types/Message'
import { messageService } from '@/services/messageService'

const messages = ref<Message[]>([])
const loading = ref<boolean>(false)

const fetchMessages = async () => {
  loading.value = true
  try {
    messages.value = await messageService.getMessages()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMessages()
})
</script>

<template>
  <div>
    <h1>Messages</h1>

    <div v-if="loading">Loading...</div>

    <ul v-else>
      <li v-for="message in messages" :key="message.id">
        {{ message.subject }} - {{ message.type }}
      </li>
    </ul>
  </div>
</template>
