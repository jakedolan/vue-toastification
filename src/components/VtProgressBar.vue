<template>
  <div :style="style" :class="cpClass" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Timer } from '../utils/timer'
import { VT_NAMESPACE } from "../ts/constants"
import PROPS from "../ts/propValidators"

export default defineComponent({
  name: "VtProgressBar",

  props: PROPS.PROGRESS_BAR,

  // TODO: The typescript compiler is not playing nice with emit types
  // Rollback this change once ts is able to infer emit types
  emits: ["close-toast"],
  data() {
    return {
      hasClass: true,
      timerRef: null,
    }
  },
  computed: {
    style(): {
      animationDuration: string
      animationPlayState: string
      opacity: number
    } {
      return {
        animationDuration: `${this.timeout}ms`,
        animationPlayState: this.isRunning ? "running" : "paused",
        opacity: this.hideProgressBar ? 0 : 1,
      }
    },

    cpClass(): string {
      return this.hasClass ? `${VT_NAMESPACE}__progress-bar` : ""
    },
  },

  watch: {
    isRunning: {
      handler(newv, oldv) {
        this.$nextTick(() => {
          if (this.timeout) {
            if (!oldv && newv) {
              this.timerRef.resume()
            }
            if (oldv && !newv) {
              this.timerRef.pause()
            }
          }
        })
      }
    },
    timeout() {
      this.hasClass = false
      this.$nextTick(() => (this.hasClass = true))
    },
  },

  mounted() {
    this.timerRef = new Timer(() => { this.$emit("close-toast") }, this.timeout);
    if (this.timeout) {
      this.timerRef.start();
    }
  },
})
</script>
