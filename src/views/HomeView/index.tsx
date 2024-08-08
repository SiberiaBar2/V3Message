import { defineComponent, ref, onMounted } from 'vue'
import { NButton, NCard, NSpace } from 'naive-ui'

import { ContentContainer } from '@/components/ContentContainer'
import { list } from '../../json/index'

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
    onMounted(() => {
      fetch('https://www.subjectservice.shop/api/tree')
      // fetch('http://localhost:3004/api/tree')
        .then((response) => response.json())
        .then((data) => {
          console.log('data====>', data)

          return data
        })
        .catch(console.error)
    })
    const rightTextInner = ref<string>('')
    const nowText = ref<string[]>(['->'])

    const content = ref(list)
    const origin = ref([list])

    const addSubject = () => {
      // fetch('http://localhost:3004/api/upsert', {
      // //   .catch(console.error)
      fetch('https://www.subjectservice.shop/api/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // 设置请求头，告诉服务器你发送的是JSON格式的数据
        },
        body: JSON.stringify(addItem)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data====>', data)

          return data
        })
        .catch(console.error)
    }
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
    const renderHeader = () => (
      <>
        <div class={styles.leftContent}>
          <NButton type="success" onClick={addSubject}>新增一项</NButton>
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
            {content.value.map((item) => {
              return (
                <div
                  key={item.level}
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
                    ) : (
                      <div>{item.name}</div>
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
