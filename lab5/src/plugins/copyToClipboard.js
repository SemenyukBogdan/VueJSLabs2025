/**
 * Плагін CopyToClipboardPlugin — копіювання тексту в буфер обміну.
 * Використання: this.$copyToClipboard('текст') або через глобальну властивість.
 */

export default {
  install(app) {
    app.config.globalProperties.$copyToClipboard = async (text) => {
      if (!text) return false
      try {
        await navigator.clipboard.writeText(String(text))
        return true
      } catch {
        return false
      }
    }
  }
}
