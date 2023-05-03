<script lang="ts" setup>
import { message } from 'ant-design-vue'

interface FormVerifyState {
  token: string
}
const { tokenVerify } = defineProps({
  tokenVerify: {
    type: String,
    default: ""
  },
})
const formRef = ref<FormInstance>()
const formVerifyState = reactive<FormVerifyState>({
  token: tokenVerify,
})
const onFinish = (values: FormVerifyState) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: ValidateErrorEntity<FormVerifyState>) => {
  console.log('Failed:', errorInfo)
}

const onResendEmail = () => {
  console.log('resend')

  const key = 'verify_resend'
  message.loading({ content: 'Loading...', key })
  setTimeout(() => {
    message.success({ content: 'Loaded!', key, duration: 4 })
  }, 2000)
  setTimeout(() => {
    message.error({ content: 'Error!', key, duration: 4 })
  }, 5000)
}
</script>

<template>
  <div class="verify-wrap">
    <div class="text-center mb-4">
      <NuxtLink to="/">
        <span class="bb-logo"><img src="/logo.svg" alt="logo" /></span>
      </NuxtLink>
      <h4>Verify</h4>
      <p>get started with our service</p>
    </div>
    <a-form
      id="bb-form-login"
      ref="formRef"
      name="bb_verify"
      class="login-form"
      :model="formVerifyState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="token"
        :rules="[
          { required: true, message: 'Please input your token verify!' },
        ]"
      >
        <a-input
          v-model:value="formVerifyState.token"
          size="large"
          placeholder="Your token"
        >
          <template #prefix>
            <lock-outlined type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          style="width: 100%"
          size="large"
          type="primary"
          html-type="submit"
        >
          Verify
        </a-button>
      </a-form-item>
      <div class="text-center">
        Don't receive an email?
        <a-button style="padding: 0" type="link" @click.prevent="onResendEmail">
          resend now!
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.verify-wrap {
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
  margin: auto;
  box-shadow: 0 1rem 3rem rgba(77, 84, 124, 0.09);
  padding: 1.5rem;
  border-radius: 0.25rem;

  .bb-logo {
    width: 46px;
    display: inline-flex;

    img {
      width: 100%;
    }
  }

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
}
</style>
