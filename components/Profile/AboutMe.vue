<template>
  <div class="p-card about">
    <div class="p-card-header">
    </div>
    <div class="p-card-body">
      <h5>{{ name }}</h5>
      <p>{{ user.attributes.email }}</p>
    </div>
    <div class="p-card-footer">
      <b-form-checkbox
        id="checkbox-subscribe"
        v-model="form.subscribe"
        name="checkbox-subscribe"
        value="1"
        unchecked-value="0"
      >
        Subscribe to notifications
      </b-form-checkbox>
    </div>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'AboutMe',
  data () {
    const user = this.$store.state.user
    return {
      form: {
        subscribe: user.attributes['custom:subscribe'] || 0
      },
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    name () {
      const user = this.$store.state.user
      if (user.attributes.given_name && user.attributes.family_name) {
        return `${user.attributes.given_name} ${user.attributes.family_name}`
      }
      return ''
    }
  },
  methods: {
    async onSelectedSubscribe () {
      try {
        this.loading = true
        const currentUser = await Auth.currentAuthenticatedUser()
        await Auth.updateUserAttributes(currentUser, {
          'custom:subscribe': this.form.subscribe
        })
      } catch (err) {
        this.$bvToast.toast('Failed to update user subscription', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-card {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #fff;

  .p-card-header {
    color: #495057;
    font-weight: 500;
    border-bottom: 1px solid #e6ebf5;
    padding-bottom: 20px;
  }

  .p-card-body {
    padding: 20px 0;
  }

  .p-card-footer {
    border-top: 1px solid #e6ebf5;
    padding-top: 20px;
    text-align: center;
  }
}

.about {
  .p-card-body {
    text-align: center;
  }
}
</style>
