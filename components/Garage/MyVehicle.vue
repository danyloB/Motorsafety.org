<template>
  <div class="vehicle-container">
    <div class="title row">
      <div class=" col-md-12 col-lg-4">
        <div class="vin">
          {{ vehicle.displayText }}
        </div>
        <div
          v-if="vehicle && vehicle.info && vehicle.info.recalls"
          class="total-recalls"
          @click="gotoRecallsSearch"
        >
          {{ vehicle.info.recalls.length }} recalls
        </div>
      </div>
      <div class="col-md-12 col-lg-8 title-right">
        <div class="info-container">
          <div v-if="vehicle.loading">
            <div class="d-flex justify-content-center mb-3">
              <b-spinner label="Loading..."></b-spinner>
            </div>
          </div>
          <div v-if="!vehicle.loading && !vehicle.error && vehicle.info" class="car-info">
            <div>
              <div class="car-info-value">
                Make
              </div>
              <div>
                {{ vehicle.info.make }}
              </div>
            </div>
            <div>
              <div class="car-info-value">
                Model
              </div>
              <div>
                {{ vehicle.info.model_name }}
              </div>
            </div>
            <div>
              <div class="car-info-value">
                Year
              </div>
              <div>
                {{ vehicle.info.model_year }}
              </div>
            </div>
          </div>
        </div>
        <div class="vehicle-rm">
          <b-button size="sm" variant="danger" @click="removeVehicle">
            <font-awesome-icon :icon="['fa', 'trash']" />
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyVehicle',
  components: {},
  props: {
    vehicle: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      progressValue: 0,
      timer: null
    }
  },
  watch: {
    vehicle: {
      deep: true,
      handler (val) {
        if (val && val.error === true && !this.timer) {
          this.startTimer()
        }
      }
    }
  },
  mounted () {
    if (this.vehicle && this.vehicle.error && !this.timer) {
      this.startTimer()
    }
  },
  methods: {
    gotoRecallsSearch () {
      if (this.vehicle.data.vin) {
        this.$router.push('/recall-search-detailed/?vin=' + this.vehicle.data.vin)
      } else {
        const { make, year, model } = this.vehicle.data
        this.$router.push({
          path: '/recall-search-detailed/',
          query: {
            make, model, year
          }
        })
      }
    },
    removeVehicle () {
      this.$bvModal.msgBoxConfirm(`Please confirm that you want to
      delete ${this.vehicle.displayText} from you garage`, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((confirmation) => {
          if (confirmation) {
            this.$emit('on-remove')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    startTimer () {
      this.stopTimer()
      this.timer = setInterval(() => {
        this.progressValue += (100 / 60)
        if (this.progressValue >= 100) {
          this.progressValue = 0
          this.stopTimer()
          this.$emit('retry')
        }
      }, 1000)
    },
    stopTimer () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.vehicle-container {
  background: #fff;
  margin-bottom: 20px;
  padding: 25px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .title {

    .vin {
      font-weight: 600;
      font-size: 1.2rem;
      padding-bottom: 5px;
    }

    .total-recalls {
      color: #888;
      font-weight: 600;
      cursor: pointer;
    }

    .title-right {
      display: flex;

      .info-container {
        flex-grow: 1;

        .loading-error {
          span {
            color: var(--danger);
            font-weight: 600;
          }

          .loading-progress {
            width: 90%;
            margin: auto;
          }
        }

        .car-info {
          display: flex;

          & > div {
            width: 33%;
          }

          .car-info-value {
            font-weight: 600;
            padding-bottom: 10px;
          }
        }
      }

      .vehicle-rm {
        width: 40px;
      }
    }
  }

  .recall-list-wrapper {
    background: #fafafa;
    padding: 20px;
  }
}
</style>
