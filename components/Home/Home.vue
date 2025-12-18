<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__hdln">Good morning</h1>
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
  </div>
</template>

<style lang="scss" scoped>
.home__header {
  display: flex;
  align-items: center;
}

.home__hdln {
  font-size: 2.25rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  line-height: 1;
}

.home__socials {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.home__social-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 2.25rem;
  border: 2px solid #e7e5e4;
  border-radius: 58px;
  font-size: 0.75rem;
  color: $color-text-primary;
  font-weight: 500;
}

.home__status {
  font-family: 'Inter', sans-serif;
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

.home__social-icon {
  filter: brightness(0);
}
</style>

<script>
export default {
  name: 'Home'
}
</script>
