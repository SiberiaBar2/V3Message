import { defineComponent, ref, toRaw, Teleport, Transition } from 'vue'
import { useDialog, NInput } from 'naive-ui'
import { useContextMenu } from '@/hooks'

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
];

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
    }
  },
  setup(props, ctx) {
    const dialog = useDialog()
    const containerRef = ref<HTMLDivElement | null>(null)
    const { x, y, visiable } = useContextMenu(containerRef)

    const editValue = ref('')
    const todoList: { [x: number]: Function } = {
      0: () => {
        dialog.warning({
          title: `新增子项`,
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
            props?.addSubject({
              parentId: props?.id,
              child: [
                {
                  name: editValue.value
                }
              ]
            })
            editValue.value = ''
          }
        })
      },
      1: () => {
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
      2: () => {
        dialog.warning({
          title: `确认删除？`,
          content: '您确定要删除吗',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            props?.deleteNode({
              id: props.item?.id
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
        {ctx?.slots?.default ? ctx.slots.default() : null}
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
