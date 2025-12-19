<template>
  <div class="index">
    <div class="index__header">
      <h1 class="index__hdln">{{ greeting }}</h1>
      <div class="index__socials">
        <div class="index__social-item">
          <img
            src="/instagram.svg"
            alt="Instagram icon"
            class="index__social-icon"
          />
          <span class="index__social-username">@olivia.summer</span>
          <span class="index__status index__status--rejected">Rejected</span>
        </div>
        <div class="index__social-item">
          <img src="/tiktok.svg" alt="TikTok icon" class="index__social-icon" />
          <span class="index__social-username">@oliviasummer</span>
          <span class="index__status index__status--accepted">Accepted</span>
        </div>
      </div>
    </div>
    <Campaigns :campaigns="campaigns" />
  </div>
</template>

<script>
import Campaigns from '../components/Campaigns/Campaigns.vue'

export default {
  name: 'IndexPage',
  components: {
    Campaigns
  },
  async asyncData({ $axios }) {
    try {
      const campaigns = await $axios.$get('/api/')
      return { campaigns }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      return { campaigns: [] }
    }
  },
  computed: {
    greeting() {
      const hour = new Date().getHours()

      if (hour < 12) {
        return 'Good morning'
      } else if (hour < 18) {
        return 'Good afternoon'
      } else {
        return 'Good evening'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  overflow: hidden;
}

.index__header {
  display: flex;
  align-items: center;
  margin-right: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.index__hdln {
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-family: $font-family-secondary;
  font-weight: 400;
}

.index__socials {
  display: flex;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 900px) {
    margin-left: 0;
    width: 100%;
  }

  @media (max-width: 620px) {
    flex-wrap: wrap;
  }
}

.index__social-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 2.75rem;
  border: 2px solid $color-border;
  border-radius: 58px;
  font-size: 0.75rem;
  color: $color-text-primary;
  font-weight: 500;
}

.index__social-icon {
  width: auto;
  height: 20px;
  filter: brightness(0);
}

.index__status {
  font-family: $font-family-primary;
  border-radius: 44px;
  padding: 2px 8px;
}

.index__status--rejected {
  background-color: $color-status-rejected-bg;
  color: $color-status-rejected;
}

.index__status--accepted {
  background-color: $color-status-accepted-bg;
  color: $color-status-accepted;
}
</style>
