// src/stores/notificationStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getNotifications, markNotificationAsRead } from '@/service/api'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])     // toutes les notifications
  const loading = ref(false)
  const error = ref(null)

  // ✅ Nombre de notifications non lues
  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  // 🔹 Actions
  async function fetchNotifications() {
    loading.value = true
    error.value = null
    try {
      const data = await getNotifications()
      notifications.value = data
    } catch (err) {
      error.value = err.message || 'Failed to fetch notifications'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function markAsRead(notificationId) {
    try {
      await markNotificationAsRead(notificationId)
      // Met à jour localement
      const notif = notifications.value.find(n => n.id === notificationId)
      if (notif) notif.read = true
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
  }
})
