<script lang="ts" setup>
const { locale, locales, t } = useI18n()

interface FormRegisterState {
  name: string
  email: string
  password: string
  confirm_pass: string
  agreement: boolean
}

const formRef = ref<FormInstance>()
const formRegisterState = reactive<FormRegisterState>({
  name: '',
  email: '',
  password: '',
  confirm_pass: '',
  agreement: false,
})
const onFinish = (values: FormRegisterState) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: ValidateErrorEntity<FormRegisterState>) => {
  console.log('Failed:', errorInfo)
}

const validatePassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('pass_required'))
  } else if (value.trim().length <= 6) {
    return Promise.reject(t('reg_pass_min_length'))
  } else {
    if (formRegisterState.confirm_pass !== '') {
      formRef.value.validateFields('checkPass')
    }
    return Promise.resolve()
  }
}
const validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('reg_pass_confirm'))
  } else if (value !== formRegisterState.password) {
    return Promise.reject(t('reg_pass_two_confirm'))
  } else {
    return Promise.resolve()
  }
}
const validateAgreement = async (_rule: Rule, value: boolean) => {
  if (!value) {
    return Promise.reject(t('reg_agreement'))
  } else {
    return Promise.resolve()
  }
}
watch(
  () => formRegisterState.agreement,
  () => {
    formRef.value?.validateFields('agreement')
  }
)
</script>

<template>
  <div class="register-wrap">
    <div class="text-center mb-4">
      <NuxtLink :to="localePath('/')">
        <span class="bb-logo"><img src="/logo.svg" alt="logo" /></span>
      </NuxtLink>
      <h4>{{ $t('register') }}</h4>
      <p>{{ $t('reg_new_account') }}</p>
    </div>
    <a-form
      id="bb-form-register"
      ref="formRef"
      name="bb_register"
      class="register-form"
      :model="formRegisterState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="name"
        :rules="[{ required: true, message: $t('reg_name_required') }]"
      >
        <a-input
          v-model:value="formRegisterState.name"
          size="large"
          :placeholder="$t('reg_name_label')"
        >
          <template #prefix>
            <user-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
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
          v-model:value="formRegisterState.email"
          size="large"
          type="email"
          :placeholder="$t('email_label')"
        >
          <template #prefix>
            <mail-outlined type="mail" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        has-feedback
        name="password"
        :rules="[
          { required: true, validator: validatePassword, trigger: 'change' },
        ]"
      >
        <a-input-password
          v-model:value="formRegisterState.password"
          size="large"
          type="password"
          :placeholder="$t('pass_label')"
        >
          <template #prefix>
            <lock-outlined type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        has-feedback
        name="confirm_pass"
        :rules="[
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: 'change',
          },
        ]"
      >
        <a-input-password
          v-model:value="formRegisterState.confirm_pass"
          size="large"
          type="password"
          :placeholder="$t('reg_pass_confirm_label')"
        >
          <template #prefix>
            <lock-outlined type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        name="agreement"
        :rules="[
          {
            validator: validateAgreement,
            trigger: 'change',
          },
        ]"
      >
        <a-checkbox v-model:checked="formRegisterState.agreement">
          {{ $t('reg_term_1') }}
          <a href="#"> {{ $t('reg_term_2') }} </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="register-form-button"
        >
          {{ $t('register') }}
        </a-button>
      </a-form-item>
      <div class="text-center">
        {{ $t('reg_have_account') }}
        <NuxtLink :to="localePath('/login')">
          {{ $t('reg_login_now') }}
        </NuxtLink>
      </div>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.register-wrap {
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

  .register-form-button {
    width: 100%;
  }
}
</style>
