<template>
  <div class="campaigns">
    <div class="campaigns__header">
      <h2 class="campaigns__heading">Your campaigns</h2>
      <div class="campaigns__actions">
        <button
          class="campaigns__action-btn"
          :disabled="!canScrollLeft"
          @click="handleLeft"
        >
          <img src="/chevron-left.svg" alt="Previous" />
        </button>
        <button
          class="campaigns__action-btn"
          :disabled="!canScrollRight"
          @click="handleRight"
        >
          <img src="/chevron-right.svg" alt="Next" />
        </button>
      </div>
    </div>
    <div class="campaigns__container">
      <ul
        ref="listContainer"
        class="campaigns__list"
        @scroll="updateScrollButtons"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startDrag"
        @touchmove="drag"
        @touchend="endDrag"
      >
        <CampaignsItem
          v-for="(campaign, index) in campaigns"
          :key="campaign.uid + '-' + index"
          :campaign="campaign"
          :index="index"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import CampaignsItem from './CampaignsItem.vue'

export default {
  name: 'Campaigns',
  components: {
    CampaignsItem
  },
  props: {
    campaigns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      canScrollLeft: false,
      canScrollRight: true,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      slideWidth: 0,
      gap: 0,
      slidesPerView: 1,
      scrollStep: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.measureSlides()
      window.addEventListener('resize', () => this.measureSlides(), {
        passive: true
      })
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    effectiveScrollStep() {
      return this.scrollStep || this.slideWidth + this.gap || 0
    }
  },
  methods: {
    onResize() {
      this.measureSlides()
    },
    measureSlides() {
      const container = this.$refs.listContainer
      if (!container) return

      const firstItem = container.children && container.children[0]
      if (!firstItem) {
        this.slideWidth = 0
        this.slidesPerView = 1
        this.gap = 0
        this.scrollStep = 0
        this.updateScrollButtons()
        return
      }

      const itemRect = firstItem.getBoundingClientRect()
      const slideWidth = itemRect.width || 0
      const styles = window.getComputedStyle(container)
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0
      const containerWidth = container.clientWidth || 0

      const slidesPerView =
        slideWidth > 0
          ? Math.max(1, Math.floor((containerWidth + gap) / (slideWidth + gap)))
          : 1

      // Scroll step should move items into view but keep showing a peek of the next card
      const scrollStep = (slideWidth + gap) * Math.max(slidesPerView - 0.7, 1)

      this.slideWidth = slideWidth
      this.gap = gap
      this.slidesPerView = slidesPerView
      this.scrollStep = scrollStep
      this.updateScrollButtons()
    },
    updateScrollButtons() {
      const container = this.$refs.listContainer
      if (container) {
        const epsilon = 1 // account for subpixel rounding
        this.canScrollLeft = container.scrollLeft > 0
        this.canScrollRight =
          container.scrollLeft <
          container.scrollWidth - container.clientWidth - epsilon
      }
    },
    handleLeft() {
      const container = this.$refs.listContainer
      if (container) {
        container.scrollBy({
          left: -this.effectiveScrollStep,
          behavior: 'smooth'
        })
        setTimeout(() => this.updateScrollButtons(), 300)
      }
    },
    handleRight() {
      const container = this.$refs.listContainer
      if (container) {
        container.scrollBy({
          left: this.effectiveScrollStep,
          behavior: 'smooth'
        })
        setTimeout(() => this.updateScrollButtons(), 300)
      }
    },
    startDrag(e) {
      const container = this.$refs.listContainer
      if (!container) return

      this.isDragging = true
      container.style.cursor = 'grabbing'
      container.style.userSelect = 'none'
      container.style.scrollBehavior = 'auto'

      const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
      this.startX = pageX - container.offsetLeft
      this.scrollLeft = container.scrollLeft
    },
    drag(e) {
      if (!this.isDragging) return

      e.preventDefault()
      const container = this.$refs.listContainer
      if (!container) return

      const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
      const x = pageX - container.offsetLeft
      const walk = x - this.startX
      container.scrollLeft = this.scrollLeft - walk
    },
    endDrag() {
      if (!this.isDragging) return

      this.isDragging = false
      const container = this.$refs.listContainer
      if (container) {
        container.style.cursor = 'grab'
        container.style.userSelect = 'auto'
        container.style.scrollBehavior = 'smooth'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.campaigns {
  margin-top: 40px;

  @media (max-width: 640px) {
    margin-top: 20px;
  }
}

.campaigns__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 2rem;
}

.campaigns__heading {
  font-family: $font-family-secondary;
  font-weight: 400;
  line-height: 32px;
}

.campaigns__actions {
  display: flex;
  gap: 12px;
}

.campaigns__action-btn {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  border: 1px solid $color-border;
  background: $color-white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: $color-button-hover-bg;
    border-color: $color-button-hover-border;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    border-color: $color-border;
    cursor: not-allowed;

    img {
      filter: brightness(0) saturate(100%) invert(57%) sepia(6%) saturate(18%)
        hue-rotate(7deg);
      opacity: 0.7;
    }
  }

  span {
    font-size: 24px;
    line-height: 1;
    user-select: none;
  }
}

.campaigns__container {
  margin-top: 24px;
  overflow: hidden;
}

.campaigns__list {
  display: flex;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }
}
</style>
