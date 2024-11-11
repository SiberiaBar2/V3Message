import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { NButton, NCard, NSpace, NInput } from 'naive-ui'

import ContextMenu from '../ContextMenu'

export default defineComponent({
  name: 'Subjects',
  props: {
    addSubject: {
      type: Function,
      default: () => {}
    },
    editNode: {
      type: Function,
      default: () => {}
    },
    deleteNode: {
      type: Function,
      default: () => {}
    },
    treeList: {
      type: Array,
      default: []
    },
    changeTree: {
      type: Function,
      default: () => {}
    },
    downLevel: {
      type: Function,
      default: () => {}
    },
    parentId: {
      type: Object,
      default: {}
    }
  },
  setup(props, ctx) {
    const editIndex = ref(-1)
    const addItemName = ref('')

    const content = ref<any[]>(props?.treeList)
    const origin = ref([props?.treeList])

    const removeEditIndex = () => (editIndex.value = -1)
    onMounted(() => {
      window.addEventListener('click', removeEditIndex)
    })
    onUnmounted(() => {
      window.removeEventListener('click', removeEditIndex)
    })

    const rightTextInner = ref<string>('')
    const nowText = ref<string[]>(['->'])

    return () => {
      return (
        <NSpace vertical>
          <NCard
            style={{
              margin: '5px 0px'
            }}
          >
            <NButton
              onClick={() => {
                if (!addItemName.value) return
                props?.addSubject({
                  child: [
                    {
                      name: addItemName.value,
                      children: []
                    }
                  ],
                  parentId: props?.parentId.value
                })

                addItemName.value = ''
              }}
            >
              新增
            </NButton>
            <NInput
              style={{
                width: '200px',
                marginLeft: '10px'
              }}
              value={addItemName.value}
              onInput={(v) => {
                addItemName.value = v
              }}
            />
          </NCard>
          {content.value?.map((item, index) => {
            return (
              <div
                key={item?.id}
                onClick={() => {
                  props?.downLevel(item, index)
                }}
              >
                <ContextMenu
                  item={item}
                  id={item?.id}
                  editNode={props?.editNode}
                  deleteNode={props.deleteNode}
                  addSubject={props?.addSubject}
                  v-slots={{
                    default: () => (
                      <NCard
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {item.children && item.children.length > 0 ? (
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 0.4 0.4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="rgb(18, 107, 174)"
                            >
                              <path d="M0.363 0.075H0.193l-0.021 -0.021L0.163 0.05h-0.125l-0.013 0.013v0.275l0.013 0.013h0.325l0.013 -0.013v-0.25zm-0.013 0.212V0.325h-0.3V0.175h0.112l0.009 -0.004 0.022 -0.022H0.35v0.038zm0 -0.162h-0.163l-0.009 0.004 -0.022 0.022H0.05v-0.075h0.107l0.021 0.021 0.009 0.004H0.35z" />
                            </svg>
                          ) : null}

                          {editIndex.value === index ? (
                            <NInput
                              style={{
                                width: '260px'
                              }}
                              value={item.name}
                              onInput={(v) => {
                                content.value[index].name = v
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                marginLeft: '10px'
                              }}
                              onClick={() => {
                                editIndex.value = index
                              }}
                            >
                              {item.name}
                            </span>
                          )}
                        </div>
                      </NCard>
                    )
                  }}
                ></ContextMenu>
              </div>
            )
          })}
        </NSpace>
      )
    }
  }
})
