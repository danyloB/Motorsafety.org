<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group
        label="Current password:"
        label-for="current-password"
      >
        <b-form-input
          id="current-password"
          v-model="$v.form.currentPassword.$model"
          type="password"
          :state="validateState('currentPassword')"
          aria-describedby="current-password-feedback"
        />
        <b-form-invalid-feedback
          id="current-password-feedback"
        >
          Current password is required.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="New password:"
        label-for="new-password"
      >
        <b-form-input
          id="new-password"
          v-model="$v.form.newPassword.$model"
          type="password"
          :state="validateState('newPassword')"
          aria-describedby="new-password-feedback"
        />
        <b-form-invalid-feedback
          id="new-password-feedback"
        >
          New password must have at least 8 characters.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Password verify:"
        label-for="password-verify"
      >
        <b-form-input
          id="password-verify"
          v-model="$v.form.verify.$model"
          type="password"
          :state="validateState('verify')"
          aria-describedby="verify-feedback"
        />
        <b-form-invalid-feedback
          id="verify-feedback"
        >
          Password verify must be the same with new password.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">
        Change password
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'PasswordForm',
  mixins: [validationMixin],
  data () {
    return {
      form: {
        currentPassword: null,
        newPassword: null,
        verify: null
      }
    }
  },
  validations: {
    form: {
      currentPassword: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(8)
      },
      verify: {
        sameAsPassword: sameAs('newPassword')
      }
    }
  },

  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    resetForm () {
      this.form = {
        currentPassword: null,
        newPassword: null,
        verify: null
      }

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    async onSubmit () {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      try {
        const user = await Auth.currentAuthenticatedUser()
        await Auth.changePassword(user, this.form.currentPassword, this.form.newPassword)
        this.$bvToast.toast('Change password successfully', {
          title: 'Updated',
          autoHideDelay: 5000,
          variant: 'success',
          solid: true
        })
        this.resetForm()
      } catch (err) {
        console.log(err)
        this.$bvToast.toast(err.message, {
          title: 'Failed to change password',
          autoHideDelay: 5000,
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
