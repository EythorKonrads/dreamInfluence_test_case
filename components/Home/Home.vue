<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__hdln">{{ greeting }}</h1>
      <div class="home__socials">
        <div class="home__social-item">
          <img
            src="/instagram.svg"
            alt="Instagram icon"
            class="home__social-icon"
          />
          <span class="home__social-username">@olivia.summer</span>
          <span class="home__status home__status--rejected">Rejected</span>
        </div>
        <div class="home__social-item">
          <img src="/tiktok.svg" alt="TikTok icon" class="home__social-icon" />
          <span class="home__social-username">@oliviasummer</span>
          <span class="home__status home__status--accepted">Accepted</span>
        </div>
      </div>
    </div>
    <HomeCampaigns :campaigns="campaigns" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    campaigns: {
      type: Array,
      default: () => []
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
.home {
  overflow: hidden;
}

.home__header {
  display: flex;
  align-items: center;
  margin-right: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.home__hdln {
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-family: $font-family-secondary;
  font-weight: 400;
}

.home__socials {
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

.home__social-item {
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

.home__social-icon {
  width: auto;
  height: 20px;
  filter: brightness(0);
}

.home__status {
  font-family: $font-family-primary;
  border-radius: 44px;
  padding: 2px 8px;
}

.home__status--rejected {
  background-color: $color-status-rejected-bg;
  color: $color-status-rejected;
}

.home__status--accepted {
  background-color: $color-status-accepted-bg;
  color: $color-status-accepted;
}
</style>
