<template>
  <div class="vehicle-details">
    <div class="car-info">
      <div class="car-thumb">
        <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/sm-car" />
      </div>
      <div class="milage">
        104,773 <span>Today’s Milage</span>
      </div>
      <div class="text">
        THis car Lorem text
      </div>
    </div>
    <div class="car-status">
      <div class="registered wrap">
        <span class="status-icon" /> Registration
        <span>9 month left</span>
      </div>
      <div class="oil-change wrap overdue">
        <span class="status-icon" /> Oil Change <span>overdue</span>
      </div>
      <div class="time-rotation wrap overdue">
        <span class="status-icon" /> Tire Rotation <span>overdue</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VehicleInfo'
}
</script>

<style scoped>
  .vehicle-details {
    display: flex;
    justify-content: space-between;
  }

  .car-info {
    display: flex;
    align-items: center;
  }

  .car-thumb {
    width: 100px;
    height: 100px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }

  .car-thumb img {
    max-width: 95%;
  }

  .milage,
  .text {
    font-size: 24px;
    font-weight: 500;
    margin-right: 15px;
  }

  .milage span {
    font-size: 16px;
    font-weight: 400;
    opacity: 0.7;
    display: block;
  }

  .car-status {
    display: flex;
    align-items: center;
    margin: 25px 0;
  }

  .status-icon {
    display: block;
    width: 46px;
    height: 46px;
    margin: 10px auto;
    border: 7px solid #e7e7e7;
    border-radius: 50%;
  }

  .overdue .status-icon {
    border-color: #cd4c4c;
  }

  .overdue span {
    color: #cd4c4c;
  }

  .car-status {
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }

  .car-status .wrap {
    margin: 0 30px;
  }

  .car-status span {
    font-size: 12px;
    opacity: 0.7;
    display: block;
  }

  .car-info .text {
    opacity: 0.7;
  }

  @media screen and (max-width: 991px) {
    .vehicle-details {
      flex-flow: column;
    }

    .car-info {
      margin: 15px auto;
      justify-content: center;
    }

    .car-status {
      margin: 25px auto;
    }
  }

  @media screen and (max-width: 767px) {
    .car-info .text {
      font-size: 18px;
      margin: 15px 0 0 0;
    }
  }

  @media screen and (max-width: 576px) {
    .car-info {
      flex-wrap: wrap;
    }

    .car-status {
      font-size: 14px;
      font-weight: 500;
    }

    .car-status .wrap {
      margin: 0 15px;
    }
  }
</style>
