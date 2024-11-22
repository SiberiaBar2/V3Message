import { defineComponent, ref, reactive } from 'vue'
import { NButton, useMessage, useDialog, NSpace, NInput } from 'naive-ui'
import { useQuery } from '@karlfranz/vuehooks'

import { ContentContainer } from '@/components/ContentContainer'
import Subjects from '../components/Subjects'
import { useTreeLevel } from '@/hooks'
import { client } from '@/http'

import styles from './index.module.scss'

export default defineComponent({
  setup() {
    const message = useMessage()
    const { path, copyList, upLevel, downLevel, insideData, parentId, setShowList } = useTreeLevel()

    const treeList = reactive<any[]>([])
    const { loading, run: getTreeData } = useQuery(() => client('api/tree'), {
      success(res) {
        treeList.length = 0
        treeList.push(...res?.treeData)
        insideData(res?.treeData)
        setShowList()
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
        return client('api/addChild', 'POST', params)
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
    const deleteList = reactive<number[]>([])

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

    const changeTree = (v: string, index: number) => {
      treeList[index].name = v
    }
    const addItemName = ref('')
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
                dialog.warning({
                  title: `批量新增`,
                  content: () => (
                    <>
                      <div>多个以逗号 “ , ” 分隔</div>
                      <NInput
                        value={addItemName.value}
                        onInput={(v) => (addItemName.value = v)}
                        placeholder={'请输入'}
                        type="textarea"
                      />
                    </>
                  ),
                  positiveText: '确定',
                  negativeText: '取消',
                  onPositiveClick: () => {
                    const addItems = addItemName.value?.split('，').map((ele) => {
                      return {
                        name: ele,
                        children: []
                      }
                    })
                    addSubject({
                      parentId: parentId.value,
                      child: addItems
                    })
                    addItemName.value = ''
                  }
                })
              }}
            >
              批量新增
            </NButton>
            <NButton
              type="error"
              onClick={() => {
                if (deleteList.length === 0) {
                  return
                }
                dialog.warning({
                  title: `确认删除？`,
                  content: '您确定要删除吗',
                  positiveText: '确定',
                  negativeText: '取消',
                  onPositiveClick: () => {
                    deleteNode({
                      ids: deleteList
                    })
                  }
                })
              }}
            >
              批量删除
            </NButton>
            {renderPosition()}
          </NSpace>
          <div
            style={{
              margin: '10px 0'
            }}
          />
          {rightTextInner.value ? `-${rightTextInner.value}` : ''}
          <Subjects
            treeList={copyList}
            parentId={parentId}
            editNode={editNode}
            downLevel={downLevel}
            addSubject={addSubject}
            deleteNode={deleteNode}
            changeTree={changeTree}
            deleteList={deleteList}
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
