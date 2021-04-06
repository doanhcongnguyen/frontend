<template>
  <div class="footer">
    <span class="font10">v{{ version }}</span>
  </div>
</template>

<script>
import { version } from '../../../package.json'

export default {
  data() {
    return {
      version: version
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.footer {
  background: $footerBg;
  height: 2rem;
  text-align: right;
  padding-top: 0.5rem;
  padding-right: 1rem;
}

.font10 {
  font-size: 0.8em;
}
</style>
