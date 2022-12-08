<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div class="main-body-term">
          <div class="term-title">
            <h1>MOTORSAFETY.ORG</h1>
            <h1>PRIVACY POLICY</h1>
            <h6>Last Updated: 8/29/2020</h6>
          </div>
          <div class="content">
            <p>
              This privacy policy (“<strong>Policy</strong>”) describes how MotorSafety.org and its related companies
              (“<strong>Company</strong>”)
              collect, use and share personal information of consumer users of this website, www.motorsafety.org (the
              “<strong>Site</strong>”). This Policy also applies to any of our other websites that post this Policy.
              This Policy does not
              apply to websites that post different statements.
            </p>
            <ul class="ul-term privacy">
              <li>
                <h3>WHAT WE COLLECT</h3>
                <p>We get information about you in a range of ways.</p>
                <ul>
                  <li>
                    <strong>Information You Give Us.</strong> We collect your name, postal address, email address, phone
                    number, fax
                    number, username, password, demographic information (such as your gender and occupation), mobile
                    device id (for push notifications), VIN (vehicle identification number), maintenance records (e.g.
                    oil
                    change, etc.), vehicle mileage, as well as other information you directly give us on our Site.
                  </li>

                  <li>
                    <strong>Information We Get From Others.</strong> We may get information about you from other
                    sources. We may add
                    this to information we get from this Site.
                  </li>

                  <li>
                    <strong>Information Automatically Collected.</strong> We automatically log information about you and
                    your computer.
                    For example, when visiting our Site, we log your computer operating system type, browser type,
                    browser language, the website you visited before browsing to our Site, pages you viewed, how long
                    you spent on a page, access times and information about your use of and actions on our Site.
                  </li>

                  <li>
                    <strong>Cookies.</strong> We may log information using "cookies." Cookies are small data files
                    stored on your hard
                    drive by a website. We may use both session Cookies (which expire once you close your web browser)
                    and persistent Cookies (which stay on your computer until you delete them) to provide you with a
                    more personal and interactive experience on our Site. This type of information is collected to make
                    the Site more useful to you and to tailor the experience with us to meet your special interests and
                    needs.
                  </li>
                </ul>
              </li>

              <li>
                <h3>USE OF PERSONAL INFORMATION</h3>
                <p>
                  We use your personal information as follows:
                </p>
                <ul class="privacy-dot">
                  <li>
                    We use your personal information to operate, maintain, and improve our sites, products, and
                    services.
                  </li>
                  <li>
                    We use your personal information to respond to comments and questions and provide customer service.
                  </li>
                  <li>
                    We use your personal information to send information including confirmations, invoices, technical
                    notices, updates, security alerts, and support and administrative messages.
                  </li>
                  <li>
                    We use your personal information to communicate about promotions, upcoming events, and other news
                    about products and services offered by us and our selected partners.
                  </li>
                  <li>
                    We use your personal information to link or combine user information with other personal
                    information.
                  </li>
                  <li>
                    We use your personal information to protect, investigate, and deter against fraudulent,
                    unauthorized, or illegal activity.
                  </li>
                  <li>
                    We use your personal information to provide and deliver products and services customers request.
                  </li>
                  <li>
                    We use your personal information to provide the service of recall monitoring and notifications.
                  </li>
                  <li>
                    We use your personal information to book vehicle service appointments.
                  </li>
                </ul>
              </li>

              <li>
                <h3>SHARING OF PERSONAL INFORMATION</h3>
                <p>We may share personal information as follows:</p>
                <ul class="privacy-dot">
                  <li>
                    We may share personal information with your consent. For example, you may let us share personal
                    information with others for their own marketing uses. Those uses will be subject to their privacy
                    policies.
                  </li>
                  <li>
                    We may share personal information when we do a business deal, or negotiate a business deal,
                    involving the sale or transfer of all or a part of our business or assets. These deals can include
                    any merger, financing, acquisition, or bankruptcy transaction or proceeding.
                  </li>
                  <li>
                    We may share personal information for legal, protection, and safety purposes.
                    <ul style="list-style-type: circle; padding-left: 20px">
                      <li>
                        We may share information to comply with laws.
                      </li>
                      <li>
                        We may share information to respond to lawful requests and legal processes.
                      </li>
                      <li>
                        We may share information to protect the rights and property of MotorSafety.org, our agents,
                        customers, and others. This includes enforcing our agreements, policies, and terms of use.
                      </li>
                      <li>
                        We may share information in an emergency. This includes protecting the safety of our employees
                        and agents, our customers, or any person.
                      </li>
                    </ul>
                  </li>
                  <li>
                    We may share information with those who need it to do work for us.
                  </li>
                </ul>
                <p>We may also share aggregated and/or anonymized data with others for their own uses.</p>
              </li>

              <li>
                <h3>INFORMATION CHOICES AND CHANGES</h3>
                <p>
                  Our marketing emails tell you how to “opt-out.” If you opt out, we may still send you non-marketing
                  emails. Non-marketing emails include emails about your accounts and our business dealings with
                  you.
                </p>
                <p>
                  You may send requests about personal information to our Contact Information below. You can request to
                  change contact choices, opt-out of our sharing with others, and update your personal information.
                </p>
                <p>
                  You can typically remove and reject cookies from our Site with your browser settings. Many browsers
                  are set to accept cookies until you change your settings. If you remove or reject our cookies, it
                  could affect how our Site works for you.
                </p>
              </li>
              <li>
                <strong class="content-leader">CONTACT INFORMATION.</strong>
                We welcome your comments or questions about this privacy policy. You may also contact us at our address:
                MotorSafety.org <br>
                740 Tunbridge Rd. <br>
                Danville, California 94526 <br>
              </li>
              <li>
                <strong class="content-leader">CHANGES TO THIS PRIVACY POLICY.</strong> We may change this privacy policy. If we make any
                changes, we will
                change the Last Updated date above.
              </li>
            </ul>
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
  name: 'Privacy',
  components: {
    InnerHeader,
    Footer
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.main-body-term .content {
  h3, strong.content-leader {
    font-size: 1.25rem;
    font-weight: 600;
  }
  ul.ul-term.privacy > li > ul.privacy-dot {
    list-style-type: disc;
    padding-left: 40px;

    & > li {
      padding-left: 10px;
    }
  }

}
</style>
