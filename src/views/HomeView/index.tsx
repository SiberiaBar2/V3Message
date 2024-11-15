import { defineComponent, ref, reactive, toRaw } from 'vue'
import { NButton, useMessage, useDialog, NSpace } from 'naive-ui'
import { useQuery } from '@karlfranz/vuehooks'

import { ContentContainer } from '@/components/ContentContainer'
import Subjects from '../components/Subjects'
import { useTreeLevel } from '@/hooks'
import { client } from '@/http'

import styles from './index.module.scss'

export default defineComponent({
  setup() {
    const message = useMessage()
    const { path, copyList, upLevel, downLevel, insideData, parentId } = useTreeLevel()

    const treeList = reactive<any[]>([])
    const { loading, run: getTreeData } = useQuery(() => client('api/tree'), {
      success(res) {
        console.log('res===>', res)
        treeList.length = 0
        treeList.push(...res?.treeData)
        insideData(res?.treeData)
      }
    })
    const { loading: clearLoading, run: clearTree } = useQuery(() => client('api/clear', 'POST'), {
      manual: true,
      success() {
        message.success('删除成功！')
        getTreeData()
      }
    })

    const { run: addSubject, loading: addEditLoading } = useQuery(
      (params) => {
        console.log('params', params)

        return client(
          'api/addChild',
          'POST',
          // ...treeList,
          // {
          // name: addItemName.value,
          // children: []
          params
          // {
          //   child: params,
          //   parendId:
          // }
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
    const { run: editNode, loading: editLoading } = useQuery(
      (params) => {
        return client('api/editNode', 'POST', params)
      },
      {
        manual: true,
        success() {
          message.success('编辑成功！')
          getTreeData()
        }
      }
    )
    const { run: deleteNode, loading: deleteLoading } = useQuery(
      (params) => {
        return client('api/deleteNode', 'POST', params)
      },
      {
        manual: true,
        success() {
          message.success('删除成功！')
          getTreeData()
        }
      }
    )

    const rightTextInner = ref<string>('')
    const nowText = ref<string[]>(['->首页'])

    const renderPosition = () =>
      nowText.value ? (
        <div
          style={{
            marginLeft: '14px',
            marginBottom: '5px'
          }}
        >
          {path?.length > 0 ? (
            <span
              style={{
                fontSize: '14px'
              }}
            >
              当前位置-
            </span>
          ) : null}
          {path?.map((e, i) => {
            if (i === path.length - 1) return e
            return e + '/'
          })}
        </div>
      ) : (
        ''
      )

    // const addItemName = ref('')

    const dialog = useDialog()
    const confirmClear = () => {
      dialog.warning({
        title: '确定删除?',
        content: '确定删除全部? 此操作不可恢复!',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          clearTree()
        }
      })
    }

    console.log('copyList', copyList)

    const changeTree = (v: string, index: number) => {
      treeList[index].name = v
    }
    const renderHeader = () => (
      <>
        <div class={styles.leftContent}>
          <NSpace>
            <NButton
              quaternary
              color="rgb(18, 107, 174)"
              disabled={path.length === 0}
              onClick={() => {
                upLevel()
              }}
            >
              {'<'}
            </NButton>
            <NButton type="error" onClick={confirmClear}>
              删除全部
            </NButton>
            <NButton
              type="info"
              onClick={() => {
                alert('开发中')
              }}
            >
              批量导入
            </NButton>
            {renderPosition()}
          </NSpace>

          {rightTextInner.value ? `-${rightTextInner.value}` : ''}
          <Subjects
            treeList={copyList}
            parentId={parentId}
            editNode={editNode}
            downLevel={downLevel}
            addSubject={addSubject}
            deleteNode={deleteNode}
            changeTree={changeTree}
          />
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
