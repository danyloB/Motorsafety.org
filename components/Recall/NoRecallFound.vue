<template>
  <div class="no-recall-cnt row">
    <div class="col-12 col-lg-6 subscription-form">
      <h2>Congratulations! Your vehicle has no open recalls reported to MotorSafety!</h2>
      <h5 class="gray-text">
        Get FREE monitoring for future recalls with a MotorSafety account for your...
      </h5>
      <p v-if="summary" class="vin-summary">
        <span v-if="summary.make">{{ summary.make }}</span>
        <span v-if="summary.model">{{ summary.model }}</span>
        <span v-if="summary.year">{{ summary.year }}</span>
        <span class="change-text link-btn">Change</span>
      </p>
      <b-form>
        <div class="form-group">
          <label class="label-text">Email</label>
          <b-form-input
            v-model="email"
            type="email"
            required
            placeholder="john@example.com"
            class="email-input"
          />
        </div>
        <div class="form-group form-submit">
          <button
            class="btn btn-primary btn-block btn-lg text-center text-md-left"
          >
            Get FREE open recall alerts
          </button>
        </div>
      </b-form>
    </div>
    <div class="col-12 col-lg-6 banner">
      <div class="banner-text">
        <h2 class="white-text">
          Did you know?
        </h2>
        <h4 class="white-text">
          1 in 5 cars on the road today has an open recall.
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoRecallFound',
  props: {
    summary: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      email: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .no-recall-cnt {
    background: #fff;
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    & > div {
      min-height: 500px;
    }

    .banner {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%),
      url('https://res.cloudinary.com/motorsafety/image/upload/v2-motorsafety/assets/backgrounds/audi-banner')
      no-repeat center center;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      border-radius: 0 8px 8px 0;
      position: relative;
      .banner-text {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 30px;
        color: #fff;

        .white-text {
          color: #fff;
        }
      }
    }

    .subscription-form {
      padding: 30px;

      .gray-text {
        color: rgba(14, 14, 14, 0.5);
        font-size: 20px;
        line-height: 120%;
      }

      .email-input {
        height: 60px;
      }

      .label-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 32px;

        color: #0E0E0E;
        opacity: 0.7;
      }

      .vin-summary {
        span {
          padding-right: 10px;
          font-weight: 500;
          font-size: 17px;
          line-height: 100%;

          color: #292929;
        }
      }
    }
  }
</style>
