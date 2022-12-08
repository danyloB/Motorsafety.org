<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle" class="news-details-page">
        <section class="news-details-cnt">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-4 col-lg-3 order-2 order-md-1">
                <NewsDetailSummary :item="item" />
                <div class="recall-form-container">
                  <h3>Find Recalls</h3>
                  <h6>More than 1 in 4 vehicles on the road have an unrepaired call.</h6>
                  <div>
                    <client-only>
                      <HomeRecallForm new-line-switch />
                    </client-only>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-8 col-lg-9 order-1 order-md-2">
                <div class="news-details-text">
                  <h1 v-html="item.title"></h1>
                  <cld-image v-if="item.cld_public_id" loading="lazy" cloud-name="motorsafety" :public-id="item.cld_public_id" class="recall-item-img">
                    <cld-transformation width="768" fetchFormat="webp" crop="scale" />
                  </cld-image>
                  <div class="publish-status">
                    <span>{{ status }}</span> {{ item.display_date }}
                  </div>
                  <div class="remote-description" v-html="item.description" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="latest-news-section p-0">
          <div class="container">
            <h2 class="section-heading">
              Related Posts
            </h2>
            <RecallLatestNews :recall-news="recallNews" />
          </div>
        </section>

        <section class="disclaimed">
          <div class="container">
            MotorSafety.org obtains its information from public AND OTHER AVAILABLE RECORDS AND DOES NOT WARRANT THE ACCURACY
            OF THE INFORMATION. IN THE EVENT OF AN INACCURACY, ALL RECOURSE, claims and inquiries SHALL BE ADDRESSED SOLELY TO
            THE ORIGINAL SOURCE(S) OF SUCH INFORMATION.
          </div>
        </section>

        <section class="recall-by-brand expanded-cnt bg-white mt-0 mb-4">
          <div class="container border-top pt-5">
            <h2 class="section-heading">
              Recall News by Brand
            </h2>
            <RecallByBrand :categories="categories" />
          </div>
        </section>

        <section class="check-recall-service border-top pt-5">
          <div class="container">
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import content from '@/utils/content'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import NewsDetailSummary from '@/components/Recall/NewsDetailSummary.vue'
import RecallByBrand from '@/components/Home/RecallByBrand.vue'
import RecallLatestNews from '@/components/Home/RecallLatestNews.vue'
import Footer from '@/components/Footer.vue'
import HomeRecallForm from '@/components/Home/HomeRecallForm'

export default {
  name: 'RecallNewsDetails',
  components: {
    HomeRecallForm,
    InnerHeader,
    NewsDetailSummary,
    RecallByBrand,
    RecallLatestNews,
    Footer
  },
  async asyncData ({ route, error, $content }) {
    return await content.wrap(error, async () => {
      const { slug } = route.params
      const item = await content.fetchPost($content, slug)

      return content.recallNewsData($content, null, {
        banner: false,
        append: {
          item
        }
      })
    })
  },
  data () {
    return {
      item: {}
    }
  },
  jsonld () {
    return {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': this.item.link
      },
      headline: this.item.title,
      image: [
        (this.item.featured_image) || ''
      ],
      datePublished: this.item.date,
      dateModified: this.item.modified,
      author: {
        '@type': 'Person',
        name: this.item.authors.length > 0 ? this.item.authors[0].name : ''
      },
      publisher: {
        '@type': 'Organization',
        name: 'MotorSafety.org',
        logo: {
          '@type': 'ImageObject',
          url: 'https://res.cloudinary.com/motorsafety/image/upload/v2-motorsafety/assets/images/logo'
        }
      }
    }
  },
  head () {
    const title = this.item ? `${this.item.title} | MotorSafety.org` : ''
    const defaultDescription = 'MotorSafety.org | Protecting Drivers Everywhere'
    const acf = this.item.acf
    const metaHeaders = {
      title: acf.meta_title || title,
      meta: [
        { hid: 'description', name: 'description', content: acf.meta_description || defaultDescription },
        { hid: 'og:description', name: 'og:description', content: acf.meta_description || defaultDescription }
      ]
    }
    if (acf.meta_keywords) {
      metaHeaders.meta.push({
        hid: 'keywords',
        name: 'keywords',
        content: acf.meta_keywords
      })
    }
    if (acf.custom_schema) {
      try {
        const jsonSchema = JSON.parse(acf.custom_schema)
        metaHeaders.script = [{ type: 'application/ld+json', json: jsonSchema }]
      } catch (err) {
        console.error(err)
      }
    }
    return metaHeaders
  },
  computed: {
    status () {
      if (this.item.status === 'publish') {
        return 'Published'
      }
      return this.item.status
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .featured-image {
    max-width: 100%;
    height: auto;
  }

  .news-details-cnt {
    margin: 100px 0 30px;
  }

  .news-details-text h1 {
    font-size: 48px;
  }

  .news-details-text {
    max-width: 680px;
  }

  .disclaimed .container {
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid #dee2e6;
  }

  @media screen and (max-width: 767px) {

    .news-details-cnt h1 {
      font-size: 24px;
    }

    .news-details-cnt {
      margin: 25px 0;
      padding-left: 7px;
    }

    .recall-by-brand {
      padding: 30px 0 0;
      margin: 30px 0 0;
    }

    .news-details-page .recall-by-brand .container {
      background: #f2f2f2;
      margin-bottom: 30px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1199px) {

    .news-details-cnt {
      margin: 50px 0 30px;
    }

    .news-details-text h1 {
      font-size: 38px;
    }

    .recall-by-brand {
      padding: 30px 0;
      margin: 30px 0;
    }
  }

  .recall-form-container {
    padding-top: 30px;
  }

  .recall-form-container>div {
    padding-top: 10px;
  }

  .author-detail {
    padding-top: 40px;
    border-top: 1px solid #aaa;
  }

  .publish-status {
    padding: 1rem 0;
    span {
      font-weight: 600;
      font-size: 1.2rem;
      padding-right: 20px;
    }
  }

  .author-info-container {
    text-align: center;

    .avatar {
      img {
        border-radius: 50%;
      }
    }
  }
</style>
