<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Message, MessageType } from '@/types/Message'
import { messageService } from '@/services/messageService'

const messages = ref<Message[]>([])
const loading = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const editingId = ref<number | null>(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref<'success' | 'error'>('success')

const selectedType = ref<MessageType | 'all'>('all')

const showSnackbar = (message: string, color: 'success' | 'error' = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

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

const submitMessage = async () => {
  if (!newMessage.value.subject || !newMessage.value.message) {
    return
  }

  if (isEditing.value && editingId.value) {
    await messageService.updateMessage(editingId.value, newMessage.value)
    showSnackbar('Message updated successfully')
  } else {
    await messageService.createMessage(newMessage.value)
    showSnackbar('Message created successfully')
  }

  resetForm()
  await fetchMessages()
}

const resetForm = () => {
  newMessage.value = {
    subject: '',
    message: '',
    date: '',
    senderName: '',
    type: 'incoming',
  }

  editingId.value = null
  isEditing.value = false
}

const editMessage = (message: Message) => {
  newMessage.value = { ...message }
  editingId.value = message.id ?? null
  isEditing.value = true
}

const deleteMessage = async (id?: number) => {
  if (!id) return

  await messageService.deleteMessage(id)
  showSnackbar('Message deleted successfully')
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
  <v-container>
    <v-card class="pa-4 mb-6">
      <v-card-title>
        {{ isEditing ? 'Edit Message' : 'Create Message' }}
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="newMessage.subject" label="Subject" />

        <v-text-field v-model="newMessage.message" label="Message" />

        <v-text-field v-model="newMessage.date" label="Date" type="datetime-local" />

        <v-text-field v-model="newMessage.senderName" label="Sender Name" />

        <v-select
          v-model="newMessage.type"
          :items="['incoming', 'outgoing', 'task']"
          label="Type"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submitMessage">
          {{ isEditing ? 'Update' : 'Create' }}
        </v-btn>

        <v-btn v-if="isEditing" color="grey" @click="resetForm"> Cancel </v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>Messages</v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedType"
          :items="['all', 'incoming', 'outgoing', 'task']"
          label="Filter by Type"
          class="mb-4"
        />

        <v-progress-circular v-if="loading" indeterminate />

        <v-list v-else>
          <v-list-item v-for="message in filteredMessages" :key="message.id">
            <v-list-item-title> {{ message.subject }} ({{ message.type }}) </v-list-item-title>

            <template #append>
              <v-btn icon="mdi-pencil" size="small" @click="editMessage(message)" />
              <v-btn
                icon="mdi-delete"
                size="small"
                color="red"
                @click="deleteMessage(message.id)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>
