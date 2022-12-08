<template>
  <div id="garage-tabs">
    <b-tabs title-link-class="nav-link">
      <b-tab title="History" active>
        <div
          class="card tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="tab-A"
        >
          <div id="heading-A" class="card-header" role="tab">
            <h5 class="mb-0">
              <!-- Note: `data-parent` removed from here -->
              <a
                v-b-toggle.collapse-A
                data-toggle="collapse"
                aria-expanded="true"
                aria-controls="collapse-A"
              >
                History
              </a>
            </h5>
          </div>
          <b-collapse
            id="collapse-A"
            class="collapse show"
            data-parent="#content"
            role="tabpanel"
            aria-labelledby="heading-A"
          >
            <div>
              <div class="card-body">
                <div class="history-cnt">
                  <div class="history-actions">
                    <ul>
                      <li class="long-gap">
                        <div class="h-date">
                          Aug 14, 4:02 PM
                        </div>
                        <div class="h-icon">
                          <font-awesome-icon :icon="['fas', 'circle']" />
                        </div>
                        <div class="h-desc">
                          <strong>Chevron Gas</strong> fuel purchase $62.31 at
                          107,277 miles
                        </div>
                      </li>
                      <li>
                        <div class="h-date">
                          Aug 14, 4:02 PM
                        </div>
                        <div class="h-icon">
                          <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/tick" />
                        </div>
                        <div class="h-desc">
                          <strong>California</strong> fuel purchase $62.31 at
                          107,277 miles
                        </div>
                      </li>
                      <li>
                        <div class="h-date">
                          Aug 14, 4:02 PM
                        </div>
                        <div class="h-icon">
                          <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/tires" />
                        </div>
                        <div class="h-desc">
                          <strong>Laguna Beach Motorcars</strong>
                          tires rotated at 106,791 miles
                        </div>
                      </li>
                      <li>
                        <div class="h-date">
                          Aug 14, 4:02 PM
                        </div>
                        <div class="h-icon">
                          <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/engine" />
                        </div>
                        <div class="h-desc">
                          <strong>Pep Boys</strong> oil change performed at
                          104,032 miles
                        </div>
                      </li>
                      <li>
                        <div class="h-date">
                          Aug 14, 4:02 PM
                        </div>
                        <div class="h-icon">
                          <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                        </div>
                        <div class="h-desc">
                          <strong>Pep Boys</strong> oil change performed at
                          104,032 miles
                        </div>
                      </li>
                    </ul>
                    <div class="">
                      <a href="#" class="load-link">Load more</a>
                    </div>
                  </div>

                  <div class="add-new-record">
                    <div class="record-form">
                      <h3 class="section-inner-heading">
                        Add new service record
                      </h3>
                      <div class="inline-input">
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Mileage at time of service"
                          >
                        </div>
                        <div class="form-group">
                          <select class="form-control">
                            <option>Date of service</option>
                          </select>
                        </div>
                      </div>
                      <div class="inline-input">
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Service Garage / Mechanic"
                          >
                        </div>
                        <div class="form-group">
                          <select class="form-control">
                            <option>Select service type</option>
                          </select>
                        </div>
                      </div>
                      <div class="inline-input">
                        <div class="file-field">
                          <div class="btn">
                            Upload Receipt
                            <span class="icon-camera" />
                            <input type="file">
                          </div>
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Additional notes"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>
      </b-tab>
      <b-tab title="Schedule">
        <div
          class="card tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="tab-A"
        >
          <div id="heading-A" class="card-header" role="tab">
            <h5 class="mb-0">
              <!-- Note: `data-parent` removed from here -->
              <a
                v-b-toggle.collapse-B
                data-toggle="collapse"
                aria-expanded="true"
                aria-controls="collapse-B"
              >
                Schedule
              </a>
            </h5>
          </div>
          <b-collapse
            id="collapse-B"
            class="collapse show"
            data-parent="#content"
            role="tabpanel"
            aria-labelledby="heading-B"
          >
            <div>
              <div class="card-body">
                Schedule content will come here...
              </div>
            </div>
          </b-collapse>
        </div>
      </b-tab>
      <b-tab title="Costs">
        <div
          class="card tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="tab-A"
        >
          <div id="heading-A" class="card-header" role="tab">
            <h5 class="mb-0">
              <!-- Note: `data-parent` removed from here -->
              <a
                v-b-toggle.collapse-C
                data-toggle="collapse"
                aria-expanded="true"
                aria-controls="collapse-C"
              >
                Costs
              </a>
            </h5>
          </div>
          <b-collapse
            id="collapse-C"
            class="collapse show"
            data-parent="#content"
            role="tabpanel"
            aria-labelledby="heading-C"
          >
            <div>
              <div class="card-body">
                Costs content will come here...
              </div>
            </div>
          </b-collapse>
        </div>
      </b-tab>
      <b-tab title="Shops">
        <div
          class="card tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="tab-A"
        >
          <div id="heading-A" class="card-header" role="tab">
            <h5 class="mb-0">
              <!-- Note: `data-parent` removed from here -->
              <a
                v-b-toggle.collapse-D
                data-toggle="collapse"
                aria-expanded="true"
                aria-controls="collapse-D"
              >
                Shops
              </a>
            </h5>
          </div>
          <b-collapse
            id="collapse-D"
            class="collapse show"
            data-parent="#content"
            role="tabpanel"
            aria-labelledby="heading-D"
          >
            <div>
              <div class="card-body">
                Shops content will come here..
              </div>
            </div>
          </b-collapse>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'GarageTabs'
}
</script>

<style scoped>
  .history-cnt {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .history-cnt .load-link {
    margin-left: 120px;
  }

  .history-actions ul {
    list-style-type: none;
  }

  .history-actions ul li:before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    display: block;
    background: #e0e4e9;
    left: 145px;
    z-index: 0;
  }

  .history-actions ul li:last-child:before {
    height: calc(100% - 25px);
  }

  .history-actions ul li {
    display: flex;
    position: relative;
    padding: 0 0 25px;
  }

  .history-actions ul li div {
    margin: 0 15px;
  }

  .h-date {
    font-size: 12px;
    color: #8998a8;
  }

  .h-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 22;
  }

  .h-icon .fa-circle {
    font-size: 28px;
    color: #476282;
  }

  .h-icon .fa-exclamation-circle {
    color: #eb5757;
    font-size: 28px;
  }

  .h-desc {
    color: #1b3a57;
    font-size: 12px;
  }

  .h-desc strong {
    margin-right: 10px;
  }

  .history-actions ul li.long-gap {
    padding-bottom: 100px;
  }

  .add-new-record {
    border-radius: 7px;
    background: #fff;
    border: 1px solid #e7e7e7;
    padding: 20px;
    width: 55%;
  }

  .record-form .form-control {
    min-width: 250px;
  }

  .record-form h3 {
    font-size: 22px;
    font-weight: 500;
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .inline-input {
    display: flex;
    justify-content: space-between;
  }

  .inline-input .form-group {
    width: 49%;
  }

  .file-field {
    position: relative;
    width: 250px;
    height: 40px;
  }

  .file-field .btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .file-field .btn span {
    font-size: 40px;
    margin-left: 15px;
  }

  .file-field input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 40px;
    width: 250px;
  }

  @media (max-width: 767px) {
    #garage-tabs .tab-content > .tab-pane {
      display: block !important;
      opacity: 1;
      margin: 0 0 15px;
    }
  }

  @media screen and (max-width: 991px) {
    #garage-tabs {
      margin-top: 20px;
    }

    .history-cnt {
      flex-flow: column;
    }

    .add-new-record {
      width: 100%;
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 767px) {
    .card-header {
      border-bottom: 0;
    }

    #garage-tabs .card-body {
      padding: 10px 5px;
    }

    .history-actions ul li:before {
      left: 112px;
    }

    .history-actions ul li div {
      margin: 0 5px;
    }

    .history-actions ul li div.h-desc {
      margin-top: 5px;
    }

    .inline-input {
      flex-flow: column;
    }

    .inline-input .form-group {
      width: 100%;
      margin-bottom: 20px;
    }

    .file-field {
      margin: 10px auto;
    }
  }
</style>
