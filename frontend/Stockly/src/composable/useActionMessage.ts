import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

interface Options {
  duration?: number
  closable?: boolean
  fontSize?: string // new optional option
  minWidth?: string // new optional option
  padding?: string // new optional option
}

export function useActionMessage() {
  const showSuccess = (content: string, options: Options = {}) => {
    message.success(content, {
      duration: options.duration ?? 5000,
      closable: options.closable ?? true,
    })
  }

  const showError = (content: string, options: Options = {}) => {
    message.error(content, {
      duration: options.duration ?? 5000,
      closable: options.closable ?? true,
    })
  }

  const showInfo = (content: string, options: Options = {}) => {
    message.info(content, {
      duration: options.duration ?? 3000,
      closable: options.closable ?? true,
    })
  }

  const showWarning = (content: string, options: Options = {}) => {
    message.warning(content, {
      duration: options.duration ?? 3000,
      closable: options.closable ?? true,
    })
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }
}
