import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { NCard, NSpace, NInput, NCheckbox } from 'naive-ui'

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
    deleteList: {
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
    const content = ref<any[]>(props?.treeList)
    const childRef = ref<{ openMenu: (e: MouseEvent) => void } | null>(null)

    return () => {
      return (
        <NSpace vertical>
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
                  ref={childRef}
                  index={index}
                  editNode={props?.editNode}
                  deleteNode={props.deleteNode}
                  addSubject={props?.addSubject}
                  deleteList={props?.deleteList}
                  // v-slots={{
                  //   default: () => (
                  //     <NCard
                  //       style={{
                  //         display: 'flex',
                  //         cursor: 'pointer'
                  //       }}
                  //     >
                  //       <div style={LINESTYLE}>
                  //         <div style={LINESTYLE}>
                  //           {item.children && item.children.length > 0 ? (
                  //             <svg
                  //               width="20px"
                  //               height="20px"
                  //               viewBox="0 0 0.4 0.4"
                  //               xmlns="http://www.w3.org/2000/svg"
                  //               fill="rgb(18, 107, 174)"
                  //             >
                  //               <path d="M0.363 0.075H0.193l-0.021 -0.021L0.163 0.05h-0.125l-0.013 0.013v0.275l0.013 0.013h0.325l0.013 -0.013v-0.25zm-0.013 0.212V0.325h-0.3V0.175h0.112l0.009 -0.004 0.022 -0.022H0.35v0.038zm0 -0.162h-0.163l-0.009 0.004 -0.022 0.022H0.05v-0.075h0.107l0.021 0.021 0.009 0.004H0.35z" />
                  //             </svg>
                  //           ) : null}
                  //           {editIndex.value === index ? (
                  //             <NInput
                  //               style={{
                  //                 width: '260px'
                  //               }}
                  //               value={item.name}
                  //               onInput={(v) => {
                  //                 content.value[index].name = v
                  //               }}
                  //             />
                  //           ) : (
                  //             <span
                  //               style={{
                  //                 marginLeft: '10px'
                  //               }}
                  //               onClick={() => {
                  //                 editIndex.value = index
                  //               }}
                  //             >
                  //               {item.name}
                  //             </span>
                  //           )}
                  //         </div>

                  //         <div style={LINESTYLE}>
                  //           <NCheckbox
                  //             onChange={(c, e) => {
                  //               console.log('c', c, item)
                  //               e.stopPropagation()
                  //               if (c && !props?.deleteList.includes(item.id)) {
                  //                 props.deleteList.push(item.id)
                  //               } else {
                  //                 const filterList = props.deleteList.filter(
                  //                   (ele: any) => ele.id !== item.id
                  //                 )
                  //                 props.deleteList.length = 0
                  //                 props.deleteList.push([...filterList])
                  //               }
                  //             }}
                  //           />
                  //           <svg
                  //             width="20px"
                  //             height="20px"
                  //             viewBox="0 0 0.6 0.6"
                  //             fill="none"
                  //             xmlns="http://www.w3.org/2000/svg"
                  //             style={{
                  //               marginLeft: '10px'
                  //             }}
                  //             onClick={(e) => {
                  //               e.stopPropagation();
                  //               childRef.value?.openMenu(e)
                  //             }}
                  //           >
                  //             <path
                  //               d="M0.3 0.1a0.025 0.025 0 0 1 0.025 0.025v0.15h0.15a0.025 0.025 0 1 1 0 0.05h-0.15v0.15a0.025 0.025 0 1 1 -0.05 0v-0.15H0.125a0.025 0.025 0 1 1 0 -0.05h0.15V0.125a0.025 0.025 0 0 1 0.025 -0.025"
                  //               fill="#0D0D0D"
                  //             />
                  //           </svg>
                  //         </div>
                  //       </div>
                  //     </NCard>
                  //   )
                  // }}
                />
              </div>
            )
          })}
        </NSpace>
      )
    }
  }
})
