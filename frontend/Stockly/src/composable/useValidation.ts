import { ref } from 'vue'

// ces refs seront partagées partout
export const visible = ref(false)
export const title = ref('Validation')
export const message = ref('')

export function useGlobalModal() {
  const show = (msg: string, modalTitle = 'Validation') => {
    message.value = msg
    title.value = modalTitle
    visible.value = true
  }

  const hide = () => {
    visible.value = false
  }

  return { visible, title, message, show, hide }
}
