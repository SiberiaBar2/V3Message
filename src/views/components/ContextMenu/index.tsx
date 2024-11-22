import { defineComponent, ref, toRaw, Teleport, Transition, onMounted, onUnmounted } from 'vue'
import { useDialog, NInput, NCard, NCheckbox } from 'naive-ui'
import { useContextMenu, useEditIndex, useMoreTodo } from '@/hooks'

import style from './index.module.scss'

const MENULIST = [
  {
    label: '新增子项'
  },
  {
    label: '编辑'
  },
  {
    label: '删除'
  }
]

const LINESTYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

enum TodoList {
  ADD,
  EDIT,
  DELETE
}

export default defineComponent({
  name: 'ContextMenu',
  props: {
    addSubject: {
      type: Function,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    },
    editNode: {
      type: Function,
      default: () => {}
    },
    deleteNode: {
      type: Function,
      default: () => {}
    },
    item: {
      type: Object,
      default: {}
    },
    deleteList: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      default: 0
    },
    content: {
      type: Object,
      default: {}
    }
  },
  setup(props, ctx) {
    const { expose } = ctx
    const dialog = useDialog()
    const containerRef = ref<HTMLDivElement | null>(null)
    const { x, y, visiable, openMenu } = useContextMenu(containerRef)
    const { editIndex } = useEditIndex()
    // 子组件暴露函数给父组件使用
    // expose({
    //   openMenu
    // })
    const editValue = ref('')
    const todoList: { [x: number]: Function } = {
      [TodoList.ADD]: () => {
        dialog.warning({
          title: `新增子项`,
          content: () => (
            <>
              <div>多个以逗号 “ , ” 分隔</div>
              <NInput
                value={editValue.value}
                onInput={(v) => (editValue.value = v)}
                placeholder={'请输入'}
                type="textarea"
              />
            </>
          ),
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            const addItems = editValue.value?.split('，').map((ele) => {
              return {
                name: ele,
                children: []
              }
            })
            props?.addSubject({
              parentId: props?.id,
              child: addItems
            })
            editValue.value = ''
          }
        })
      },
      [TodoList.EDIT]: () => {
        editValue.value = props?.item?.name
        dialog.warning({
          title: `编辑`,
          content: () => (
            <NInput
              value={editValue.value}
              onInput={(v) => (editValue.value = v)}
              placeholder={'请输入'}
            />
          ),
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            props?.editNode({
              name: editValue.value,
              id: props.item?.id
            })
            editValue.value = ''
          }
        })
      },
      [TodoList.DELETE]: () => {
        dialog.warning({
          title: `确认删除？`,
          content: '您确定要删除吗',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            props?.deleteNode({
              ids: [props.item?.id]
            })
          }
        })
      }
    }
    const handelClick = (index: number) => {
      todoList[index]?.()
    }
    return () => (
      <div class={style.container} ref={containerRef}>
        {/* {ctx?.slots?.default ? ctx.slots.default() : null} */}

        <NCard
          style={{
            display: 'flex',
            cursor: 'pointer'
          }}
        >
          <div style={LINESTYLE}>
            <div style={LINESTYLE}>
              {props.item.children && props.item.children.length > 0 ? (
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
              {editIndex.value === props.index ? (
                <NInput
                  style={{
                    width: '260px'
                  }}
                  value={props.item.name}
                  onInput={(v) => {
                    props.content.value[props.index].name = v
                  }}
                />
              ) : (
                <span
                  style={{
                    marginLeft: '10px'
                  }}
                  onClick={() => {
                    editIndex.value = props.index
                  }}
                >
                  {props.item.name}
                </span>
              )}
            </div>

            <div style={LINESTYLE}>
              <NCheckbox
                onChange={(c, e) => {
                  // console.log('c', c, item)
                  e.stopPropagation()
                  if (c && !props?.deleteList.includes(props.item.id)) {
                    props.deleteList.push(props.item.id)
                  } else {
                    const filterList = props.deleteList.filter(
                      (ele: any) => ele.id !== props.item.id
                    )
                    props.deleteList.length = 0
                    props.deleteList.push([...filterList])
                  }
                }}
              />
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 0.6 0.6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginLeft: '10px'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  // childRef.value?.openMenu(e)
                  openMenu(e)
                }}
              >
                <path
                  d="M0.3 0.1a0.025 0.025 0 0 1 0.025 0.025v0.15h0.15a0.025 0.025 0 1 1 0 0.05h-0.15v0.15a0.025 0.025 0 1 1 -0.05 0v-0.15H0.125a0.025 0.025 0 1 1 0 -0.05h0.15V0.125a0.025 0.025 0 0 1 0.025 -0.025"
                  fill="#0D0D0D"
                />
              </svg>
            </div>
          </div>
        </NCard>
        <Teleport to={'body'}>
          <div
            v-show={visiable.value}
            style={{
              left: x.value + 'px',
              top: y.value + 'px'
            }}
            class={style['context-menu']}
          >
            {MENULIST.map((ele, ind) => {
              return (
                <div
                  key={ele.label}
                  class={style['context-menu-item']}
                  onClick={() => handelClick(ind)}
                >
                  {ele.label}
                </div>
              )
            })}
          </div>
        </Teleport>
      </div>
    )
  }
})
