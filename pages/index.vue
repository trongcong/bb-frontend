<script lang="ts" setup>
const { locale, locales, t } = useI18n()
const localePath = useLocalePath()
const appConfig = useAppConfig()
const size = ref<SizeType>('large')

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="container">
    <div>
      <div class="links">
        <NuxtLink
          v-for="lo in availableLocales"
          :key="lo.code"
          class="button--green"
          :to="switchLocalePath(lo.code)"
          >{{ lo.name }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/login')"
          rel="noopener noreferrer"
          class="button--green"
        >
          {{ t('login') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/register')" class="button--green">
          {{ t('register') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/app')" class="button--green">
          {{ t('dashboard') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/logout')"
          rel="noopener noreferrer"
          class="button--grey"
        >
          {{ t('logout') }}
        </NuxtLink>
      </div>
    </div>
  </div>
  <div>
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">Large</a-radio-button>
      <a-radio-button value="default">Default</a-radio-button>
      <a-radio-button value="small">Small</a-radio-button>
    </a-radio-group>
    <br />
    <br />
    <a-button type="primary" :size="size">Primary</a-button>
    <a-button :size="size">Normal</a-button>
    <a-button type="dashed" :size="size">Dashed</a-button>
    <a-button danger :size="size">Danger</a-button>
    <a-button type="link" :size="size">Link</a-button>
    <br />
    <a-button type="primary" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
    </a-button>
    <a-button type="primary" shape="circle" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
    </a-button>
    <a-button type="primary" shape="round" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </a-button>
    <a-button type="primary" shape="round" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
    </a-button>
    <a-button type="primary" :size="size">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </a-button>
    <br />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.links {
  padding-top: 15px;
}
</style>
