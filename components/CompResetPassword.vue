<script lang="ts" setup>
interface FormResetPassWordState {
  email: string
}
const { tokenVerify } = defineProps({
  tokenVerify: String,
})

const formResetPassWordState = reactive<FormResetPassWordState>({
  email: '',
})
const onFinish = (values: FormResetPassWordState) => {
  console.log('Success:', values)
}

const onFinishFailed = (
  errorInfo: ValidateErrorEntity<FormResetPassWordState>
) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <div class="reset-pass-wrap">
    <div class="text-center mb-4">
      <NuxtLink :to="localePath('/')">
        <span class="bb-logo"><img src="/logo.svg" alt="logo" /></span>
      </NuxtLink>
      <h4>{{ $t('reset_pass') }}</h4>
      <p>{{ $t('login_get_start') }}</p>
    </div>
    <a-form
      id="bb-form-reset-pass"
      class="reset-pass-form"
      name="bb_reset_password"
      :model="formResetPassWordState"
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
          size="large"
          type="email"
          :placeholder="$t('email_label')"
          v-model:value="formResetPassWordState.email"
        >
          <template #prefix>
            <user-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="reset-pass-form-button"
        >
          Submit
        </a-button>
      </a-form-item>
      <div class="text-center">
        {{ $t('login_dont_have_acc') }}
        <NuxtLink :to="localePath('/register')">
          {{ $t('login_reg_now') }}
        </NuxtLink>
      </div>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.reset-pass-wrap {
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

  .reset-pass-form-forgot {
    float: right;
  }

  .reset-pass-form-button {
    width: 100%;
  }
}
</style>
