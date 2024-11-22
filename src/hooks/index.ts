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
    visiable,
    openMenu
  }
}

export const useMoreTodo = (container: globalThis.Ref<HTMLDivElement | null>) => {
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

function getValue(arr: any[], indexs: number[]) {
  return indexs.reduce((prev, index) => {
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
  const levelList = reactive<string[]>([])

  const upLevel = () => {
    levelList.pop()
    parentId.value = levelList?.[levelList.length - 1] || ''
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
    if (ele?.level > level.value && ele.children && ele.children.length > 0) {
      levelList.push(ele?.id)
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

  const setShowList = () => {
    const showList = getValue(toRaw(originList), toRaw(indexList))
    if (showList.length > 0) {
      copyList.length = 0
      setTimeout(() => {
        copyList.push(...showList)
      }, 200)
    }
  }

  const insideData = (list: any[]) => {
    originList.length = 0
    copyList.length = 0
    originList.push(...list)
    copyList.push(...list)
  }

  return {
    path,
    upLevel,
    parentId,
    copyList,
    downLevel,
    insideData,
    setShowList
  }
}

export const useEditIndex = () => {
  const editIndex = ref(-1)

  const removeEditIndex = () => (editIndex.value = -1)
  onMounted(() => {
    window.addEventListener('click', removeEditIndex)
  })
  onUnmounted(() => {
    window.removeEventListener('click', removeEditIndex)
  })

  return {
    editIndex,
  }
}
