<template>
  <div class="home">
    <HeaderTransparent :header-class="headerClass" :nav-bar-class="navBarClass" />
    <div id="middle" class="p-0">
      <section class="home-banner">
        <div class="container">
          <div class="find-form-wrap">
            <div class="find-form">
              <h2>Find Recalls</h2>
              <p>
                More than 1 in 4 vehicles on the road have an unrepaired call.
              </p>
              <client-only>
                <HomeRecallForm />
              </client-only>
            </div>
          </div>
        </div>
      </section>
      <div id="recall-news-page">
        <section class="recall-news-banner pb-4">
          <div class="container border-0 pb-0">
            <h2 class="section-heading">
              Recent Recall News
            </h2>
            <MainBanner v-if="banner" :item="banner" />
          </div>
        </section>
        <section class="latest-news-section p-0">
          <div class="container">
            <RecallLatestNews :recall-news="recallNews" />
          </div>
        </section>
      </div>
      <section class="faq-sec">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-7">
              <h2 class="section-heading">
                Frequently Asked Questions
              </h2>
              <div class="faq-wrap">
                <div>
                  <FAQ />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-5">
              <h2 class="section-heading">
                Recent Recalls
              </h2>
              <div class="recent-recall-list">
                <!--                <perfect-scrollbar>-->
                <div>
                  <RecentRecalls :items="categoryRecalls" />
                </div>
                <!--                </perfect-scrollbar>-->
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <section class="recent-recalls">
        <div class="container">
          <h2 class="section-heading">
            Recalls by Type
          </h2>
          <div class="recent-type-cnt">
            <RecallByType
              :responsive="recallByTypeResponsive"
              show-icon
            />
          </div>
        </div>
      </section> -->

      <section class="recall-by-brand">
        <div class="container">
          <h2 class="section-heading">
            Recalls by Brand
          </h2>
          <RecallByBrand :categories="categories" />
        </div>
      </section>
      <section class="steps-recall">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4 col-xl-6">
              <h4>Steps to Recall Guarantee</h4>
            </div>
            <div class="col-12 col-md-8 col-xl-6">
              <p class="text-large">
                MotorSafety.org can help you determine whether your vehicle is
                subject to a government-mandated recall or whether there is some
                factory notice that you should be informed of. Some recalls and
                notices pose a safety risk to you, while others are not
                immediately life-threatening.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="sr">
                01
              </div>
              <h5>Visit our website</h5>
              <p>
                Search our site for all major makes and models going back to
                2001. NHTSA recalls and select manufacturer notices.
              </p>
            </div>
            <div class="col-12 col-md-3">
              <div class="sr">
                02
              </div>
              <h5>Identify defects & recalls</h5>
              <p>
                Read easy-to-understand descriptions of any recalls or factory
                notices that affect all vehicles in your household.
              </p>
            </div>

            <div class="col-12 col-md-3">
              <div class="sr">
                03
              </div>
              <h5>Locate a dealership</h5>
              <p>
                Recall repairs are FREE so keep yoour family safe by getting the
                repairs at a local dealershop of the same make
              </p>
            </div>
            <div class="col-12 col-md-3">
              <div class="sr">
                04
              </div>
              <h5>Schedule a repair now</h5>
              <p>
                It's true. - dealerships. want t o repair recalls. Let them know
                what you found. on this website and seek their guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="video-cnt">
        <div class="container">
          <VideoPlayer />
        </div>
      </section>
    </div>
    <client-only>
      <RecallForm />
    </client-only>
    <Footer />
  </div>
</template>

<script>

// @ is an alias to /src
import content from '@/utils/content'
// import { resizeImage } from '@/utils'

export default {
  name: 'Index',
  components: {
    HeaderTransparent: () => import('@/components/Header/InnerHeader.vue'),
    RecallLatestNews: () => import('@/components/Home/RecallLatestNews.vue'),
    HomeRecallForm: () => import('@/components/Home/HomeRecallForm.vue'),
    FAQ: () => import('@/components/Home/FAQ.vue'),
    RecentRecalls: () => import('@/components/Home/RecentRecalls.vue'),
    // RecallByType: () => import('@/components/Home/RecallByType.vue'),
    RecallByBrand: () => import('@/components/Home/RecallByBrand.vue'),
    MainBanner: () => import('@/components/MainBanner.vue'),
    VideoPlayer: () => import('@/components/Home/VideoPlayer.vue'),
    RecallForm: () => import('@/components/RecallForm.vue'),
    Footer: () => import('@/components/Footer.vue')
  },
  async asyncData ({ $content }) {
    return await content.recallNewsData($content, null, {
      categoryRecalls: true
    })
  },
  data () {
    return {
      headerClass: 'home-header',
      navBarClass: 'bg-transparent',
      recallByTypeResponsive: {
        0: {
          items: 1.15,
          stagePadding: 25
        },
        600: {
          items: 2,
          stagePadding: 0
        },
        768: {
          items: 2.5,
          stagePadding: 15
        },
        1000: {
          items: 3.25,
          stagePadding: 20
        },
        1200: {
          items: 4.5,
          stagePadding: 0
        }
      }
    }
  },
  head () {
    return {
      title: 'Motorsafety',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Motorsafety' }
      ]

    }
  }
}
</script>
<style scoped>
  .home-banner {
    background: url(https://res.cloudinary.com/motorsafety/image/upload/f_webp/v2-motorsafety/assets/images/home-banner) no-repeat top center;
    background-size: cover;
    padding-top: 120px;
    padding-bottom: 80px;
  }

  .home-banner h2 {
    font-size: 48px;
    line-height: 1.2;
    font-weight: 500;
  }

  .home-banner .find-form-wrap {
    min-height: 560px;
  }

  .home-banner .find-form {
    display: flex;
    background: #fff;
    border-radius: 4px;
    padding: 30px 40px;
    flex-flow: column;
    max-width: 470px;
  }

  .find-form p {
    font-size: 26px;
    line-height: 1.2;
    font-weight: 500;
  }

  .recent-recalls {
    padding-top: 41px;
  }

  .recall-by-brand {
    background: #f2f2f2;
    padding: 60px 0;
    /* margin: 60px 0; */
  }

  .steps-recall {
    background: #292929;
    padding: 30px 0 100px;
    /* margin: 60px 0; */
    color: #fff;
  }

  .steps-recall .container {
    background: url(https://res.cloudinary.com/motorsafety/image/upload/v2-motorsafety/assets/images/dot-pattern) no-repeat 200px top;
    padding-top: 30px;
  }

  .steps-recall h4 {
    color: #fff;
    font-weight: 500;
    margin: 15px 0;
  }

  .steps-recall h5 {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
  }

  .steps-recall .text-large {
    font-size: 20px;
    line-height: 28px;
    margin: 25px 0 100px;
  }

  .steps-recall .sr {
    font-size: 64px;
    font-weight: 300;
    opacity: 0.3;
  }

  .recalls-locations {
    background: #f2f2f2;
    padding: 60px 0;
    margin: 60px 0;
  }

  .check-recall-service button {
    margin-top: 38px;
  }

  .check-recall-service p {
    max-width: 500px;
  }

  .faq-wrap {
    border: 1px solid #eeeeee;
    border-radius: 4px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  }

  .all-link {
    font-weight: 500;
    margin: 25px 0;
    display: inline-block;
  }

  .all-link i {
    margin-left: 15px;
    font-size: 12px;
  }

  /* .faq-sec .home-recall-list-cnt {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .faq-sec .home-recall-list-cnt li {
    width: 49%;
  } */

  .faq-sec .fix-height {
    height: 482px;
  }
  .faq-sec .fix-height.has-scroll {
    height: 482px;
    overflow-y: auto;
  }

  .faq-sec .faq-wrap i {
    cursor: pointer;
  }

  .faq-sec .recent-recall-list {
  }

  @media screen and (max-width: 767px) {
    .home-banner {
      background-size: 100% 300px;
      border-bottom: 1px solid #e7e7e7;
      padding-bottom: 30px;
    }

    .home-banner .find-form {
      margin-top: 200px;
      padding: 0;
    }

    .faq-wrap {
      margin-bottom: 30px;
    }

    .faq-wrap i {
      cursor: pointer;
    }

    .steps-recall {
      margin: 0 0 30px;
      padding: 30px 0 30px;
    }

    .recalls-locations {
      padding: 30px 0 0;
      margin: 30px 0;
    }

    .steps-recall .text-large {
      margin: 25px 0 0px;
    }

    .recall-by-brand {
      padding: 30px 0 0;
      margin: 30px 0 0;
    }
  }

  @media (min-width: 768px) {
    .expanded-cnt .container {
      width: calc(((100% - 720px) / 2) + 720px) !important;
      margin-right: 0;
      max-width: 100%;
      padding-right: 0;
    }
  }

  @media (min-width: 992px) {
    .expanded-cnt .container {
      width: calc(((100% - 960px) / 2) + 960px) !important;
      margin-right: 0;
      max-width: 100%;
      padding-right: 0;
    }
  }

  @media (min-width: 1200px) {
    .expanded-cnt .container {
      width: calc(((100% - 1326px) / 2) + 1326px) !important;
      margin-right: 0;
      max-width: 100%;
      padding-right: 0;
    }
  }

  @media (min-width: 1400px) {
    .expanded-cnt .container {
      width: calc(((100% - 1326px) / 2) + 1326px) !important;
      margin-right: 0;
      max-width: 100%;
      padding-right: 0;
    }
  }

  #recall-news-page {
    padding-top: 1rem;
  }
</style>
