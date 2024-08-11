import { ref, reactive, toRaw, onMounted, onUnmounted, watchEffect } from 'vue'

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

function getValue(arr: any[], indexes: number[]): any {
  return indexes.reduce((prev, index) => {
    return prev?.[index]?.children
  }, arr)
}

export const useTreeLevel = () => {
  const path = reactive<string[]>([])
  const originList = reactive<any[]>([])
  const copyList = reactive<any[]>([])

  const level = ref(0)
  const indexList = reactive<number[]>([])
  const parentId = ref('')

  const upLevel = () => {
    const nowLevel = level.value - 1
    if (nowLevel >= 0) {
      level.value = nowLevel
      indexList.pop()
      path.pop()
      const showList = getValue(toRaw(originList), toRaw(indexList))
      if (showList.length > 0) {
        copyList.length = 0
        copyList.push(...showList)
      }
    }
  }
  const downLevel = (ele: any, index: number) => {
    if (ele?.level > level.value) {
      parentId.value = ele?.id
      level.value = ele.level
      indexList.push(index)

      path.push(ele?.name)

      const showList = getValue(toRaw(originList), toRaw(indexList))
      if (showList.length > 0) {
        copyList.length = 0
        copyList.push(...showList)
      }
    }
  }

  const insideData = (list: any[]) => {
    originList.push(...list)
    copyList.push(...list)
  }
  return {
    upLevel,
    downLevel,
    path,
    copyList,
    insideData,
    parentId
  }
}
