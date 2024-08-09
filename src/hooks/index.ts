import { ref, onMounted, onUnmounted } from 'vue'

export const useContextMenu = (container: globalThis.Ref<HTMLDivElement | null>) => {
  const x = ref(0)
  const y = ref(0)
  const visiable = ref(false)

  const openMenu = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    visiable.value = true
    x.value = e.clientX
    y.value = e.clientY
  }

  const closeMenu = () => {
    visiable.value = false
  }

  onMounted(() => {
    container.value?.addEventListener('contextmenu', openMenu)
    window.addEventListener('click', closeMenu)
    window.addEventListener('contextmenu', closeMenu)
  })

  onUnmounted(() => {
    container.value?.removeEventListener('contextmenu', openMenu)
    window.removeEventListener('click', closeMenu)
    window.removeEventListener('contextmenu', closeMenu)
  })

  return {
    x,
    y,
    visiable
  }
}
