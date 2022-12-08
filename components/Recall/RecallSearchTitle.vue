<template>
  <div id="current-recall-cnt" class="current-recall-cnt fixed-top">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-xl-4 position-relative active-view">
          <div class="alert-cnt">
            <i class="icon-alert" /> 6 Recalls available
          </div>
          <h4 class="mb-0">
            Current recall
          </h4>
          <p>
            <button
              v-b-toggle.vehicle-info
              class="navbar-toggler collapsed d-inline-block d-md-none"
              type="button"
              data-toggle="collapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle info"
            >
              <!--              <span class="fa fa-angle-down" />-->
              <font-awesome-icon icon="fa-angle-down" />
            </button>
            Information for this vehicle
          </p>
        </div>
        <b-collapse id="vehicle-info" class="col-12 col-xl-8 collapse">
          <ul class="current-item-details">
            <li>
              <div class="label">
                Make
              </div>
              BMW
            </li>
            <li>
              <div class="label">
                Model
              </div>
              M3
            </li>
            <li>
              <div class="label">
                Year
              </div>
              2008
            </li>
            <li>
              <div class="label">
                VIN
              </div>
              WBSWL93538P330403 <a href="#">Change </a>
            </li>
            <li>
              <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/sm-car" />
            </li>
          </ul>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecallSearchTitle'
}
</script>
<style scoped>
  .current-recall-cnt {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    min-height: 127px;
    z-index: 2;
    background: #fff;
  }

  .current-recall-cnt.cnt-sticky-top {
    top: 45px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.02);
  }

  .current-item-details {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    min-height: 127px;
    align-items: center;
    padding-left: 0;
    margin: 0;
  }

  .current-item-details li {
    font-size: 20px;
  }

  .current-item-details li a {
    font-size: 16px;
    text-decoration: underline;
    color: #0e0e0e;
    opacity: 0.5;
  }

  .current-item-details li a:hover {
    opacity: 1;
  }

  .current-item-details .label {
    font-size: 14px;
    opacity: 0.3;
  }

  .alert-cnt {
    position: absolute;
    left: 180px;
    background: #f8ebeb;
    border-radius: 50px;
    height: 28px;
    max-width: 155px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 300;
    color: #882323;
    line-height: 28px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .active-view p {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    #vehicle-info.collapse {
      display: block !important;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    .current-recall-cnt {
      padding-top: 20px;
    }

    .current-item-details {
      min-height: auto;
    }
  }

  @media screen and (max-width: 767px) {
    .current-recall-cnt {
      min-height: auto;
      top: 60px;
      border-bottom: 1px solid #ccc;
    }

    .alert-cnt {
      left: 140px;
    }
  }
</style>
