import { defineComponent } from 'vue'
import Vue from 'vue'
import { NCard, NSpin } from 'naive-ui'

type P = Vue.ComponentPropsOptions<typeof NCard>

export const ContentContainer = defineComponent({
  props: ['style', 'contentStyle', 'loading'],
  name: 'ContentContainer',
  render() {
    console.log('this.$slots', this.$slots)

    return (
      <div
        style={{
          // margin: '10px 0',
          height: '100%'
        }}
      >
        <NSpin
          show={this?.loading}
          style={{
            height: '100%'
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              // height: '9%',
              height: 'calc(100vh - 20px)',

              // margin: '10px 0',
              backgroundColor: 'rgb(240, 161, 168)',
              overflow: 'hidden',
              margin: '10px',
              ...this.style
            }}
          >
            <div
              style={{
                overflowY: 'auto',
                height: '100%',
                padding: '0px 8px',
                ...this.contentStyle
              }}
            >
              {this.$slots.default ? this.$slots.default?.() : null}
            </div>
          </div>
        </NSpin>
      </div>
    )
  }
})
