import { defineStore } from 'pinia'
import { getAllActivities } from '@/service/api'
export const useActivityStore = defineStore('Activity', {
  state: () => ({
    activities: [],
  }),
  actions: {
    async fetchActivities() {
      try {
        this.activities = await getAllActivities()
      } catch (error) {
        console.error = error
      }
    },
  },
})
