import { defineComponent, ref } from 'vue'
import styles from './index.module.scss'
import { ContentContainer } from '@/components/ContentContainer'

import { NButton, NInput, NCard, NSpace, NGradientText } from 'naive-ui'

import { useBoolean, useRequest } from 'vue-custom-hook-karlfranz'
import { list } from '../../json/index'
export default defineComponent({
  setup(props, ctx) {
    const input = ref('123')

    console.log('list', list)

    const [value, { on, off, toggle }] = useBoolean()
    // console.log('input1', input.value)

    const infos = [
      {
        label: '语文',
        value: '1-3年级'
      },
      {
        label: '数学',
        value: '2年级'
      },
      {
        label: '英语',
        value: '4年级'
      },
      {
        label: '美术',
        value: '2年级'
      },
      {
        label: '音乐',
        value: '1-6年级'
      }
    ]

    const rightTextInner = ref<string>('')

    const content = ref<any[]>(list)
    const origin = ref<any[]>([list])

    // console.log('content', content.value)
    const nowText = ref<string[]>(['->'])
    // const
    return () => (
      <ContentContainer
        v-slots={{
          default: () => {
            return (
              <div class={styles.wrap}>
                {/* 22222222: {input.value} */}
                {/* <NButton type="primary">{{ default: () => 'Star Kirby' }}</NButton> */}
                {/* <a-input></a-input> */}
                {/* <Input modelValue={input.value} /> */}
                {/* <el-input v-model={input.value}></el-input> */}

                {/* <NInput
                  value={input.value}
                  onInput={(e) => {
                    console.log(e)
                    input.value = e
                  }}
                /> */}

                {/* <div>当前{value.value ? 1 : 2}</div> */}
                {/* <div onClick={() => toggle()}>改变值</div> */}
                <div class={styles.leftContent}>
                  <NButton
                    quaternary
                    type="tertiary"
                    onClick={() => {
                      if (nowText.value.length > 1) {
                        nowText.value.pop()
                      }

                      if (origin.value.length > 1) {
                        origin.value.pop()
                      }
                      content.value = origin.value[origin.value.length - 1] || origin.value
                      console.log('content.value', content.value)

                      if (rightTextInner.value) rightTextInner.value = ''
                    }}
                  >
                    返回上一级
                  </NButton>
                  <span
                    style={{
                      fontSize: '14px'
                    }}
                  >
                    当前位置
                  </span>
                  {nowText.value}
                  {rightTextInner.value ? `-${rightTextInner.value}` : ''}
                  <NSpace vertical>
                    {content.value.map((item) => {
                      return (
                        <div
                          key={item.level}
                          onClick={() => {
                            if (item.children && item.children.length > 0) {
                              nowText.value = nowText.value.concat(`-${item.name}`)
                              content.value = item.children
                              origin.value = origin.value.concat([item.children])
                              console.log('origin.value', origin.value)
                              console.log('nowText.value', nowText.value)
                            } else {
                              rightTextInner.value = item.name
                              // nowText.value = nowText.value.concat(`-${item.name}`)
                            }
                          }}
                        >
                          <NCard
                            style={{
                              cursor: 'pointer'
                            }}
                            // title={item.name}
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
                            ) : (
                              <div>{item.name}</div>
                            )}
                          </NCard>
                        </div>
                      )
                    })}
                  </NSpace>
                </div>
                <div class={styles.rightContent}>
                  {/* <NGradientText size={18}> */}
                  {rightTextInner.value}
                  {/* </NGradientText> */}
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
})
