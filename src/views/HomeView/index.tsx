import { defineComponent, ref, reactive } from 'vue'
import { NButton, useMessage, useDialog } from 'naive-ui'
import { useQuery } from '@karlfranz/vuehooks'

import { ContentContainer } from '@/components/ContentContainer'
import Subjects from '../components/Subjects'
import { client } from '@/http'

import styles from './index.module.scss'

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
        }
      }
    )

    console.log('datadata', data.value)

    const rightTextInner = ref<string>('')
    const nowText = ref<string[]>(['->'])

    const content = ref(treeList)
    const origin = ref([treeList])

    // console.log('vvv', content.value)
    // console.log('treeList', treeList)
    // console.log('clearLoading.value', clearLoading.value)

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

    // const addItemName = ref('')

    const dialog = useDialog()
    const confirmClear = () => {
      dialog.warning({
        title: '确定清除?',
        content: '确定清除全部? 此操作不可恢复!',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          clearTree()
        }
      })
    }

    const changeTree = (v: string, index: number) => {
      treeList[index].name = v
    }
    const renderHeader = () => (
      <>
        <div class={styles.leftContent}>
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
          <Subjects addSubject={addSubject} treeList={treeList} changeTree={changeTree} />
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
