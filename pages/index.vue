<template>
  <Home :campaigns="campaigns" />
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    try {
      const campaigns = await $axios.$get(
        'https://technical-case.dreaminfluencers.com/'
      )
      return { campaigns }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      return { campaigns: [] }
    }
  }
}
</script>
