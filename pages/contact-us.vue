<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div class="container">
        <h1>Contact Us</h1>
        <div class="row contact-us-content-row">
          <div class="col-sm-12 col-md-6">
            <h3>Motorsafety</h3>
            <div>
              MotorSafety.org is dedicated to helping consumers resolve problems related to vehicle recalls. Through
              education, awareness, government relations, repair facility referrals, and strategic partnerships,
              MotorSafety.org hopes to remove every unsafe vehicle from the road, facilitate its proper repair, and
              ensure its prompt return to the owner once the vehicle has met the required safety and performance
              standards.
            </div>
          </div>
          <div class="col-sm-12 col-md-6 form-wrapper">
            <ContactUsForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InnerHeader from '@/components/Header/InnerHeader.vue'
import Footer from '@/components/Footer.vue'
import ContactUsForm from '@/components/ContactUsForm'

export default {
  name: 'ContactUs',
  components: {
    ContactUsForm,
    InnerHeader,
    Footer
  },
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 85px;
}

@media screen and (max-width: 767px) {
  .contact-us-content-row .form-wrapper {
    padding-top: 1.5rem;
  }
}
</style>
