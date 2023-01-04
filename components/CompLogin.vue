<script lang="ts" setup>
const { t } = useI18n()

interface FormLoginState {
  email: string
  password: string
  remember: boolean
}

const formLoginState = reactive<FormLoginState>({
  email: '',
  password: '',
  remember: true,
})

const onFinish = (values: FormLoginState) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: ValidateErrorEntity<FormLoginState>) => {
  console.log('Failed:', errorInfo)
}

const validatorPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('pass_required'))
  } else if (value.trim().length <= 6) {
    return Promise.reject(t('reg_pass_min_length'))
  } else {
    return Promise.resolve()
  }
}
</script>

<template>
  <div class="login-wrap">
    <div class="text-center mb-4">
      <NuxtLink :to="localePath('/')">
        <span class="bb-logo"><img src="/logo.svg" alt="logo" /></span>
      </NuxtLink>
      <h4>{{ $t('login') }}</h4>
      <p>{{ $t('login_get_start') }}</p>
    </div>

    <AForm
      id="bb-form-login"
      name="bb_login"
      class="login-form"
      :model="formLoginState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="email"
        :rules="[
          { required: true, message: $t('email_required') },
          {
            type: 'email',
            message: $t('email_valid'),
          },
        ]"
      >
        <a-input
          v-model:value="formLoginState.email"
          size="large"
          type="email"
          :placeholder="$t('email_label')"
        >
          <template #prefix>
            <user-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[
          { required: true, validator: validatorPassword, trigger: 'change' },
        ]"
      >
        <a-input-password
          v-model:value="formLoginState.password"
          size="large"
          type="password"
          :placeholder="$t('pass_label')"
        >
          <template #prefix>
            <lock-outlined type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="remember">
        <a-checkbox v-model:checked="formLoginState.remember">
          {{ $t('login_remember') }}
        </a-checkbox>
        <NuxtLink class="login-form-forgot" :to="localePath('/reset-password')">
          {{ $t('login_pass_forgot') }}
        </NuxtLink>
        <div class="mt-2">
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            {{ $t('login') }}
          </a-button>
        </div>
      </a-form-item>
      <div class="text-center">
        {{ $t('login_dont_have_acc') }}
        <NuxtLink :to="localePath('/register')">
          {{ $t('login_reg_now') }}
        </NuxtLink>
      </div>
    </AForm>
  </div>
</template>

<style scoped lang="scss">
.login-wrap {
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
