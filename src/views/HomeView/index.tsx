import { defineComponent, ref, onMounted, reactive, toRaw } from 'vue'
import { NButton, NCard, NSpace, useMessage, NInput, NPopconfirm, useDialog } from 'naive-ui'
import { useQuery } from '@karlfranz/vuehooks'

import { ContentContainer } from '@/components/ContentContainer'
import { list } from '../../json/index'
import { client } from '@/http'

import styles from './index.module.scss'

const addItem = {
  name: 'Level 1 Node A',
  children: [
    {
      name: 'Level 2 Node A',
      children: [
        {
          name: 'Level 3 Node A',
          children: [
            {
              name: 'Level 4 Node A',
              children: [
                {
                  name: 'Level 5 Node A',
                  children: []
                },
                {
                  name: 'Level 5 Node B',
                  children: []
                }
              ]
            },
            {
              name: 'Level 4 Node B',
              children: []
            }
          ]
        },
        {
          name: 'Level 3 Node B',
          children: []
        }
      ]
    },
    {
      name: 'Level 2 Node B',
      children: [
        {
          name: 'Level 3 Node C',
          children: [
            {
              name: 'Level 4 Node C',
              children: [
                {
                  name: 'Level 5 Node C',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const treeList = reactive<any[]>([])
    const {
      data,
      loading,
      run: getTreeData
    } = useQuery(() => client('api/tree'), {
      success(res) {
        console.log('res===>', res)
        treeList.length = 0
        treeList.push(...res?.treeData)
      }
    })
    const { loading: clearLoading, run: clearTree } = useQuery(() => client('api/clear', 'POST'), {
      manual: true,
      success() {
        message.success('清除成功！')
        getTreeData()
      }
    })

    const { run: addSubject, loading: addEditLoading } = useQuery(
      (params) => {
        console.log('params', params)

        return client(
          'api/upsert',
          'POST',
          // ...treeList,
          // {
          // name: addItemName.value,
          // children: []
          params
          // }
          // [addItem]
        )
      },
      {
        manual: true,
        success() {
          message.success('新增成功！')
          getTreeData()
          addItemName.value = ''
        }
      }
    )

    console.log('datadata', data.value)

    const rightTextInner = ref<string>('')
    const nowText = ref<string[]>(['->'])

    const content = ref(treeList)
    const origin = ref([treeList])

    console.log('vvv', content.value)

    console.log('treeList', treeList)

    console.log('clearLoading.value', clearLoading.value)

    const renderPosition = () =>
      nowText.value ? (
        <div
          style={{
            marginLeft: '14px',
            marginBottom: '5px'
          }}
        >
          <span
            style={{
              fontSize: '14px'
            }}
          >
            当前位置
          </span>
          {nowText.value}
        </div>
      ) : (
        ''
      )

    const addItemName = ref('')

    const dialog = useDialog()
    const confirmClear = () => {
      dialog.warning({
        title: '警告',
        content: '确定清除全部，此操作不可恢复？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          clearTree()
        },
        onNegativeClick: () => {}
      })
    }

    const editIndex = ref(-1)
    const editName = ref('')
    const renderHeader = () => (
      <>
        <div class={styles.leftContent}>
          <NButton type="success" onClick={addSubject}>
            新增一项
          </NButton>
          <NButton type="warning" onClick={confirmClear}>
            清除全部
          </NButton>
          <NButton
            quaternary
            color="rgb(18, 107, 174)"
            onClick={() => {
              if (nowText.value.length > 1) nowText.value.pop()
              if (origin.value.length > 1) origin.value.pop()
              if (rightTextInner.value) rightTextInner.value = ''

              content.value = origin.value[origin.value.length - 1] || origin.value
            }}
          >
            返回上一级
          </NButton>
          {renderPosition()}
          {rightTextInner.value ? `-${rightTextInner.value}` : ''}
          <NSpace vertical>
            <NCard>
              <NButton
                onClick={() => {
                  if (!addItemName.value) return
                  addSubject([
                    ...toRaw(treeList),
                    {
                      name: addItemName.value,
                      children: []
                    }
                  ])
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
              ></NInput>
            </NCard>
            {content.value?.map((item, index) => {
              return (
                <div
                  key={item?.level}
                  onClick={() => {
                    if (item.children && item.children.length > 0) {
                      nowText.value = nowText.value.concat(`-${item.name}`)
                      content.value = item.children as typeof list
                      origin.value = origin.value.concat([item.children] as (typeof list)[])
                    } else {
                      rightTextInner.value = item.name
                    }
                  }}
                >
                  <NCard
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    {item.children && item.children.length > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 0.4 0.4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="rgb(18, 107, 174)"
                        >
                          <path d="M0.363 0.075H0.193l-0.021 -0.021L0.163 0.05h-0.125l-0.013 0.013v0.275l0.013 0.013h0.325l0.013 -0.013v-0.25zm-0.013 0.212V0.325h-0.3V0.175h0.112l0.009 -0.004 0.022 -0.022H0.35v0.038zm0 -0.162h-0.163l-0.009 0.004 -0.022 0.022H0.05v-0.075h0.107l0.021 0.021 0.009 0.004H0.35z" />
                        </svg>
                        <span
                          style={{
                            marginLeft: '10px'
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                    ) : editIndex.value === index ? (
                      <NInput
                        style={{
                          width: '260px'
                        }}
                        value={item.name}
                        onInput={(v) => {
                          treeList[index].name = v
                        }}
                        onBlur={() => {
                          console.log('...treeList...treeList', toRaw(treeList))
                          editIndex.value = -1
                          addSubject(toRaw(treeList))
                        }}
                      ></NInput>
                    ) : (
                      <div
                        onClick={() => {
                          editIndex.value = index
                        }}
                      >
                        {item.name}
                      </div>
                    )}
                  </NCard>
                </div>
              )
            })}
          </NSpace>
        </div>
      </>
    )

    return () => (
      <ContentContainer
        loading={loading.value || clearLoading.value || addEditLoading.value}
        v-slots={{
          default: () => {
            return (
              <div class={styles.wrap}>
                {renderHeader()}
                <div class={styles.rightContent}>{rightTextInner.value}</div>
              </div>
            )
          }
        }}
      />
    )
  }
})
