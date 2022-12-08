<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div class="main-body">
          <h1>About us</h1>
          <div class="about">
            <h3>Our Mission</h3>
            <p>
              There’s an epidemic of vehicle recalls causing both fear and frustration in consumers across the globe,
              especially in the United States where more than 1 in 4 vehicles on the road today have an unrepaired
              recall. That’s why MotorSafety.org was conceived. Consisting of individuals who understand technology,
              marketing, database mining and the automotive industry, MotorSafety.org’s mission is to remove every
              unsafe vehicle from the road, facilitate its proper repair, and ensure its prompt return to the owner once
              these vehicles have met the required safety and performance standards.
            </p>
          </div>
          <div class="team">
            <h3>Our Team</h3>
            <div
              v-for="member in team"
              :key="member.name"
              class="team-member"
            >
              <div class="image-wrapper">
                <img :src="member.image" class="member-picture" :alt="member.name" />
              </div>
              <div class="member-info">
                <h4 class="member-name">
                  {{ member.name }}
                </h4>

                <h5 class="role">
                  {{ member.role }}
                </h5>
                <p class="description">
                  {{ member.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import InnerHeader from '@/components/Header/InnerHeader.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AboutUs',
  components: {
    InnerHeader,
    Footer
  },
  data () {
    return {
      team: [
        {
          name: 'Christopher Miller',
          role: 'President & CEO',
          description: `Christopher Miller has over 20 years experience building software
          to automate marketing communications.
          From automotive to financial services and the hospitality industry,
          he has worked with marquee brands including HSBC/Household Automotive,
          Mercedes Benz USA, BMW/Mini North America, Volvo North America,
          Costco Automotive Group, JP Morgan Chase, Wells Fargo, Washington Mutual,
          Residential Pacific Mortgage, ServiceMagic, Monumental Life Insurance and Moxy Solutions.
          Miller believes he has truly found his passion with
          Recall Masters as he is dedicated to getting every recalled vehicle repaired,
          and he has built a proprietary and world-class technology platform to achieve that goal. `,
          image: require('../assets/images/team/christopher_miller.png')
        },
        {
          name: 'Aleksandra Snesareva ',
          role: 'Senior Editor ',
          description: 'Aleksandra has close to a decade of experience in financial ' +
            'journalism and copywriting. She has written for Global Finance Magazine, ' +
            'BNamericas and Redd Intelligence and covered multinational companies in automotive, ' +
            'healthcare and energy industries.',
          image: require('../assets/images/team/aleksandra.jpg')
        },
        {
          name: 'Rebecca Rand ',
          role: 'Contributing writer',
          description: 'Rebecca Rand is a freelance science and technology writer ' +
            'based in the San Francisco Bay Area. She drives a 2010 Toyota Yaris.',
          image: require('../assets/images/team/rebecca_rand.jpg')
        },
        {
          name: 'Ken Boyd ',
          role: 'Contributing writer',
          description: 'Ken Boyd is a five-time Dummies book author, including Accounting ' +
            'All-In-One for Dummies, and a frequent contributor at QuickBooks. ' +
            'His blog and YouTube channel links can be found at ' +
            'https://www.accountingaccidentally.com/.',
          image: require('../assets/images/team/ken_boyd.jpg')
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.main-body {
  padding-top: 80px;
  max-width: 1100px;
  margin: auto;

  h1 {
    text-align: center;
    padding-bottom: 30px;
  }

  .about {
    padding: 20px;
  }
}

.team {
  h3 {
    text-align: center;
    padding-top: 10px;
  }

  padding: 0 20px;

  .team-member {
    display: flex;
    padding: 30px;

    .image-wrapper {
      .member-picture {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .member-info {
      padding-left: 40px;
      .member-name {
        text-transform: uppercase;
        font-size: 1.5rem;
      }
      .role {
        font-style: italic;
        font-weight: lighter;
        color: var(--amplify-primary-color);
      }
      .description {
        padding-top: 15px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .main-body {
    padding-top: 20px;
  }
  .about {
    h3 {
      text-align: center;
    }
  }
  .team .team-member {
    flex-direction: column;
    padding: 0;
    padding-top: 20px;
    .image-wrapper {
      text-align: center;
    }
    .member-info {
      padding-left: 0;
      .member-name {
        text-align: center;
      }
      .role {
        text-align: center;
      }
    }
  }
}

</style>
