import { defineComponent, ref } from 'vue'
import styles from './index.module.scss'
import { ContentContainer } from '@/components/ContentContainer'

import { NButton, NInput, NCard, NSpace, NGradientText } from 'naive-ui'

export default defineComponent({
  setup(props, ctx) {
    const input = ref('123')

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

    const rightTextInner = ref<string>('123')
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

                <div class={styles.leftContent}>
                  <NSpace vertical>
                    {infos.map((item) => {
                      return (
                        <div
                          key={item.label}
                          onClick={() => {
                            rightTextInner.value = item.label + '--' + item.value
                          }}
                        >
                          <NCard
                            style={{
                              // width: '100px',
                              cursor: 'pointer'
                            }}
                            title={item.label}
                          >
                            {item.value}
                          </NCard>
                        </div>
                      )
                    })}
                  </NSpace>
                </div>
                <div class={styles.rightContent}>
                  <NGradientText size={18} type="success">
                    {rightTextInner.value}
                  </NGradientText>
                </div>
              </div>
            )
          }
        }}
      />
    )
  }
})