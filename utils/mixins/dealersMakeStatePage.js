import makes from '@/utils/makes'
import content from '@/utils/content'

export default {
  async asyncData ({ route, $content }) {
    const { state, make } = route.params

    const brandName = makes.filter(makeObject => makeObject.id.toLowerCase() === make.toLowerCase())[0].text
    const dealers = await content.fetchDealers($content, {
      state,
      brand: brandName
    })

    return {
      dealers
    }
  }
}
