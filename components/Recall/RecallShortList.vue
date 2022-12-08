<template>
  <div class="container">
    <div class="recall-list-wrap">
      <div class="title-row d-flex justify-content-between align-items-center">
        <h5>Recalls</h5>
        <span>6 recalls available</span>
      </div>
      <ul class="recall-list">
        <li>
          <h6>
            Positive Battery Cable
            <span>OEM Code: 19V-472 <em>NHTS Code: 19V472-R3</em></span>
          </h6>

          <p>
            <span class="info-label"> Brief Description</span>
            <span>Positive battery cable</span>
          </p>
          <p>
            <span class="info-label">Repair information</span>
          </p>
          <div class="item-status d-flex justify-content-between">
            <div class="item-part-status yes">
              <i class="icon-settings" />
              <div>
                <h5>Yes</h5>
                Parts available
              </div>
            </div>
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>67 hour(s)</h5>
                Est. Repair time
              </div>
            </div>
          </div>
        </li>
        <li>
          <h6>
            Positive Battery Cable
            <span>OEM Code: 19V-472 <em>NHTS Code: 19V472-R3</em></span>
          </h6>

          <p>
            <span class="info-label"> Brief Description</span>
            <span>Positive battery cable</span>
          </p>
          <p>
            <span class="info-label">Repair information</span>
          </p>
          <div class="item-status d-flex justify-content-between">
            <div class="item-part-status no">
              <i class="icon-settings" />
              <div>
                <h5>No</h5>
                Parts available
              </div>
            </div>
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>67 hour(s)</h5>
                Est. Repair time
              </div>
            </div>
          </div>
        </li>
        <li>
          <h6>
            Positive Battery Cable
            <span>OEM Code: 19V-472 <em>NHTS Code: 19V472-R3</em></span>
          </h6>

          <p>
            <span class="info-label"> Brief Description</span>
            <span>Positive battery cable</span>
          </p>
          <p>
            <span class="info-label">Repair information</span>
          </p>
          <div class="item-status d-flex justify-content-between">
            <div class="item-part-status yes">
              <i class="icon-settings" />
              <div>
                <h5>Yes</h5>
                Parts available
              </div>
            </div>
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>67 hour(s)</h5>
                Est. Repair time
              </div>
            </div>
          </div>
        </li>
        <li>
          <h6>
            Positive Battery Cable
            <span>OEM Code: 19V-472 <em>NHTS Code: 19V472-R3</em></span>
          </h6>

          <p>
            <span class="info-label"> Brief Description</span>
            <span>Positive battery cable</span>
          </p>
          <p>
            <span class="info-label">Repair information</span>
          </p>
          <div class="item-status d-flex justify-content-between">
            <div class="item-part-status yes">
              <i class="icon-settings" />
              <div>
                <h5>Yes</h5>
                Parts available
              </div>
            </div>
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>67 hour(s)</h5>
                Est. Repair time
              </div>
            </div>
          </div>
        </li>
        <li>
          <h6>
            Positive Battery Cable
            <span>OEM Code: 19V-472 <em>NHTS Code: 19V472-R3</em></span>
          </h6>

          <p>
            <span class="info-label"> Brief Description</span>
            <span>Positive battery cable</span>
          </p>
          <p>
            <span class="info-label">Repair information</span>
          </p>
          <div class="item-status d-flex justify-content-between">
            <div class="item-part-status yes">
              <i class="icon-settings" />
              <div>
                <h5>Yes</h5>
                Parts available
              </div>
            </div>
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>67 hour(s)</h5>
                Est. Repair time
              </div>
            </div>
          </div>
        </li>
        <li>
          <h6>
            Positive Battery Cable
            <span>OEM Code: 19V-472 <em>NHTS Code: 19V472-R3</em></span>
          </h6>

          <p>
            <span class="info-label"> Brief Description</span>
            <span>Positive battery cable</span>
          </p>
          <p>
            <span class="info-label">Repair information</span>
          </p>
          <div class="item-status d-flex justify-content-between">
            <div class="item-part-status yes">
              <i class="icon-settings" />
              <div>
                <h5>Yes</h5>
                Parts available
              </div>
            </div>
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>67 hour(s)</h5>
                Est. Repair time
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecallShortList'
}
</script>
<style scoped>
  .recall-list-wrap {
    width: 40%;
    padding-bottom: 25px;
  }

  .recall-list-wrap .title-row,
  .repair-center-list .title-row {
    display: flex;
    padding: 15px 0;
  }

  .recall-list-wrap .title-row h5,
  .repair-center-list .title-row h5 {
    margin-bottom: 0;
    font-size: 20px;
  }

  .recall-list-wrap .title-row span,
  .repair-center-list .title-row div {
    opacity: 0.3;
  }

  ul.recall-list,
  .repair-center-list ul {
    list-style-type: none;
    padding-left: 0;
  }

  ul.recall-list li,
  .repair-center-list ul li {
    background: #fff;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 0 24px;
  }

  ul.recall-list h6 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  ul.recall-list li h6 span {
    display: block;
    font-size: 14px;
    opacity: 0.7;
    font-weight: 400;
    margin-top: 5px;
  }

  ul.recall-list li h6 span em {
    font-style: normal;
    margin-left: 20px;
  }

  ul.recall-list p span {
    display: block;
    font-size: 14px;
  }

  ul.recall-list .info-label {
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
  }

  .item-status {
    font-size: 14px;
  }

  .item-status h5 {
    font-size: 20px;
    margin: 0;
  }

  .item-part-status,
  .item-repair-status {
    width: 49%;
    padding: 15px;
    display: flex;
    border-radius: 6px;
    background: #eee;
  }

  .item-part-status i,
  .item-repair-status i {
    margin-right: 15px;
    font-size: 20px;
  }

  .item-part-status.yes {
    background: #e4f2e0;
    color: #395f2d;
  }

  .item-part-status.yes h5 {
    color: #395f2d;
  }

  .item-part-status.no {
    background: #f8ebeb;
    color: #882323;
  }

  .item-part-status.no h5,
  .item-part-status.no i:before {
    color: #882323;
  }

  .item-part-status i {
    font-size: 22px;
  }

  .item-repair-status {
    background: #eef6f9;
    color: #3086a3;
  }

  .item-repair-status h5 {
    color: #3086a3;
  }

  @media screen and (max-width: 767px) {
    .recall-list-wrap {
      width: 100%;
    }

    ul.recall-list li h6 span em {
      display: block;
      margin: 0;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    .recall-list-wrap {
      width: 45%;
    }
  }

  @media screen and (max-width: 991px) {
    .item-status {
      flex-wrap: wrap;
    }

    .item-part-status,
    .item-repair-status {
      width: 100%;
      margin-bottom: 15px;
    }
  }
</style>
