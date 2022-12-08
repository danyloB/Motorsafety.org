<template>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-5 col-lg-6 order-md-1 order-3">
          <div class="footer-logo">
            <Logo />
          </div>
          <p>
            MotorSafety.org is dedicated to helping consumers resolve problems related to vehicle recalls. Through education, awareness, government relations, repair facility referrals, and strategic partnerships, MotorSafety.org hopes to remove every unsafe vehicle from the road, facilitate its proper repair, and ensure its prompt return to the owner once the vehicle has met the required safety and performance standards.
          </p>
        </div>
        <div class="col-12 col-md-3 col-lg-3 order-md-2 order-1">
          <h5 class="footer-heading">
            Site Information
          </h5>
          <ul class="footerlink">
            <li>
              <nuxt-link to="/recall-news/">
                Recall Matters Blog
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/">
                Check My Recall Status
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/faqs/">
                FAQ
              </nuxt-link>
            </li><li>
              <nuxt-link to="/about-us/">
                About Us
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/contact-us/">
                Contact Us
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/login/">
                Login
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-4 col-lg-3 order-md-3 order-2">
          <h5 class="footer-heading">
            Contact
          </h5>
          <p class="address">
            MotorSafety.org<br>
            23131 Verdugo Dr.<br>
            Laguna Hills, CA 92653<br>
            T: 888.594.5520 <br>
            F: 949.861.6350 <br>
            Email:
            <a
              href="mailto:support@motorsafety.org"
              class="font-weight-bold"
            >support@motorsafety.org</a>
          </p>
        </div>
      </div>
      <div class="row copyright-row">
        <div class="col-12 col-md-4 col-lg-6 order-2 order-md-1">
          <p>© MotorSafety, Inc. All Rights Reserved.</p>
        </div>
        <div class="col-12 col-md-4 col-lg-3 order-3 order-md-2">
          <nuxt-link to="/terms/">
            Terms
          </nuxt-link>
          &
          <nuxt-link to="/privacy/">
            Privacy
          </nuxt-link>
        </div>
        <div class="col-12 col-md-4 col-lg-3 order-1 order-md-3">
          <div class="social-links">
            <a href="https://www.facebook.com/motorsafety.org/">
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </a>
            <a href="https://twitter.com/motorsafetyorg">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from './Logo.vue'

export default {
  name: 'FooterArea',
  components: {
    Logo
  }
}
</script>
<style>
  #footer {
    position: relative;
  }

  h5.footer-heading {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .dark-section {
    background: #ebebeb;
  }

  ul.footerlink li {
    margin: 0;
    list-style-type: none;
    height: 28px;
  }

  ul.footerlink li a {
    color: #292929;
    opacity: 0.7;
  }

  ul.footerlink li a:hover {
    color: #00b6f2;
  }

  p.address {
    line-height: 28px;
  }

  .copyright-row {
    border-top: 1px solid #f2f2f2;
    padding: 40px 0;
    margin: 40px 0 0;
  }

  .copyright-row a {
    color: #292929;
    opacity: 0.7;
  }

  .copyright-row a:hover {
    color: #00b6f2;
  }

  .copyright-row .social-links a {
    font-size: 32px;
    margin: 0 10px;
    transition: all 0.5s ease;
    transform: scale(1);
  }

  .copyright-row .social-links a:hover {
    transform: scale(1.1);
    transition: all 0.5s ease;
    color: #00b6f2;
  }

  .footer-logo img {
    height: 28px;
    margin-bottom: 10px;
  }

  #footer p {
    opacity: 0.7;
    max-width: 520px;
  }
</style>
