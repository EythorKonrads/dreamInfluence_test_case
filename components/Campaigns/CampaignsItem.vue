<template>
  <li class="campaigns-item">
    <p class="campaigns-item__length">
      {{ placeholderCampaignLength[index] || 1 }} Days left
    </p>
    <h3 class="campaigns-item__title">{{ campaign.title }}</h3>
    <p class="campaigns-item__description">
      {{ campaign.description }}
    </p>
    <div
      class="campaigns-item__cover"
      :class="{ 'campaigns-item__cover--failed': coverImageFailed }"
      :style="{
        backgroundImage: !coverImageFailed
          ? `url(${campaign.coverURL})`
          : 'none'
      }"
      @error="onCoverImageError"
    >
      <div v-if="coverImageFailed" class="campaigns-item__cover-error">
        <p class="campaigns-item__cover-error-text">Could not fetch image</p>
      </div>
      <div class="campaigns-item__frosted-blur"></div>
      <div class="campaigns-item__header"></div>
      <div class="campaigns-item__social-icons">
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          class="campaigns-item__social-icon"
          aria-label="TikTok"
        >
          <img src="/tiktok.svg" alt="TikTok" />
        </a>
        <div class="campaigns-item__social-divider"></div>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          class="campaigns-item__social-icon"
          aria-label="Instagram"
        >
          <img src="/instagram.svg" alt="Instagram" />
        </a>
      </div>
      <div class="campaigns-item__footer">
        <img
          v-if="!logoImageFailed"
          :src="campaign.logoURL"
          :alt="campaign.title"
          class="campaigns-item__logo"
          @error="onLogoImageError"
        />
        <div
          v-else
          class="campaigns-item__logo campaigns-item__logo--fallback"
        ></div>
        <div class="campaigns-item__footer-text">
          <p class="campaigns-item__footer-title">{{ campaign.title }}</p>
          <p class="campaigns-item__hashtags">
            {{ placeholderHashtags[index] || '#general' }}
          </p>
        </div>
        <button class="campaigns-item__btn">View</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CampaignsItem',
  props: {
    campaign: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      placeholderCampaignLength: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      placeholderHashtags: [
        '#fashion',
        '#lifestyle',
        '#travel',
        '#fitness',
        '#food',
        '#beauty',
        '#wellness',
        '#tech',
        '#music',
        '#art'
      ],
      coverImageFailed: false,
      logoImageFailed: false
    }
  },
  methods: {
    onCoverImageError() {
      this.coverImageFailed = true
    },
    onLogoImageError() {
      this.logoImageFailed = true
    }
  }
}
</script>

<style lang="scss" scoped>
.campaigns-item {
  min-width: 340px;
  max-width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  list-style: none;

  @media (max-width: 768px) {
    min-width: calc(100vw - 20vw - 3rem - 20px);
    max-width: calc(100vw - 20vw - 3rem - 20px);
  }

  @media (max-width: 640px) {
    min-width: calc(100vw - 80px - 3rem - 20px);
    max-width: calc(100vw - 80px - 3rem - 20px);
  }
}

.campaigns-item__length {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  color: $color-text-tertiary;
  text-transform: uppercase;
}

.campaigns-item__title {
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
  margin: 0;
  color: $color-text-primary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaigns-item__description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: $color-text-secondary;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaigns-item__cover {
  width: 100%;
  height: 220px;
  margin-top: 12px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  overflow: hidden;
}

.campaigns-item__cover--failed {
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
}

.campaigns-item__cover-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 3;
  position: relative;
}

.campaigns-item__cover-error-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: $color-text-secondary;
  margin: 0;
}

.campaigns-item__frosted-blur {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;

  backdrop-filter: blur(80px) saturate(1.2) brightness(1.05);
  -webkit-backdrop-filter: blur(80px) saturate(1.2) brightness(1.05);

  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to top,

    rgba(0, 0, 0, 0.97) 60%,
    rgba(0, 0, 0, 0.75) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

.campaigns-item__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.campaigns-item__social-icons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(120, 120, 120, 0.6);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 52px;
  z-index: 2;
}

.campaigns-item__social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  cursor: pointer;
  text-decoration: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.campaigns-item__social-divider {
  width: 1px;
  height: 16px;
  background-color: $color-white-50;
}

.campaigns-item__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 20px;
  z-index: 1;
}

.campaigns-item__logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 12px;
}

.campaigns-item__logo--fallback {
  background: $color-border;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  font-weight: 500;
  color: $color-text-secondary;
  text-transform: uppercase;
}

.campaigns-item__logo--fallback::before {
  content: 'Failed!';
}

.campaigns-item__footer-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}

.campaigns-item__footer-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  width: 100%;
  margin: 0;
  color: $color-white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaigns-item__hashtags {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  color: $color-white;
}

.campaigns-item__btn {
  background-color: $color-white-50;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  color: $color-white;
  border: none;
  border-radius: 12px;
  padding: 8px 14px;
  font-family: $font-family-primary;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}
</style>
