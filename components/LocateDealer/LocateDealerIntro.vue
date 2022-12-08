<template>
  <div>
    <div class="section-title">
      <cld-image class="title-logo" cloud-name="motorsafety" :public-id="dealer.image_id">
        <cld-transformation quality="auto" width="48" crop="scale" />
      </cld-image>
      <h3>{{ dealer.name }}</h3>
    </div>
    <p>
      {{ dealer.about ? dealer.about : '' }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'LocateDealerIntro',
  props: {
    dealer: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
  .section-title {
    display: flex;
    align-items: center;
  }

  .section-title .title-logo {
    padding: 15px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    margin-right: 25px;
  }

  .section-title .title-logo img {
    width: 48px;
    height: 48px;
  }

  .section-title h3 {
    margin-bottom: 0;
    font-size: 36px;
    font-weight: 500;
    color: #292929;
  }

  .section-title {
    margin-bottom: 30px;
  }
</style>
