<script lang="ts" setup>
import { useRoute } from '#app'

const { query } = useRoute()
const token: string = query.token || ''
</script>

<template>
  <a-row
    style="min-height: 100vh; background: white"
    type="flex"
    justify="center"
    align="middle"
  >
    <a-col :span="24">
      <CompVerify :token-verify="token" />
    </a-col>
  </a-row>
</template>

<style scoped></style>
