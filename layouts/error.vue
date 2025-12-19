<template>
  <div class="error-page">
    <main class="error-page__content" role="main">
      <div class="error-card">
        <p class="error-card__code">{{ statusCode }}</p>
        <h1 class="error-card__title">{{ title }}</h1>
        <p class="error-card__message">{{ description }}</p>
        <div class="error-card__actions">
          <nuxt-link to="/" class="error-card__link error-card__link--primary">
            Go back home
          </nuxt-link>
          <button
            type="button"
            class="error-card__link error-card__link--ghost"
            @click="goBack"
          >
            Return to previous page
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    statusCode() {
      return this.error?.statusCode || 500
    },
    is404() {
      return this.statusCode === 404
    },
    title() {
      return this.is404 ? 'Page not found' : 'Something went wrong'
    },
    description() {
      if (this.is404) {
        return 'We could not find that page. Use the links on the left or head back home to keep exploring.'
      }

      return (
        this.error?.message ||
        'An unexpected error occurred. Please try again later.'
      )
    }
  },
  methods: {
    goBack() {
      if (process.client && window.history.length > 1) {
        window.history.back()
      } else {
        this.$router.push('/')
      }
    }
  },
  head() {
    return {
      title: `${this.statusCode} – ${this.title}`
    }
  }
}
</script>

<style scoped lang="scss">
.error-page {
  display: flex;
  min-height: 90vh;
  color: $color-text-primary;
}

.error-page__content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
}

.error-card {
  width: min(720px, 100%);
  background: $color-white;
  border: 1px solid $color-border;
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
}

.error-card__code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $color-status-rejected-bg;
  color: $color-status-rejected;
  font-weight: 600;
  font-size: $font-size-md;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.error-card__title {
  font-size: $font-size-3xl;
  line-height: 1.1;
  margin-bottom: 1rem;
  font-family: $font-family-primary;
  font-weight: 600;
}

.error-card__message {
  font-size: $font-size-md;
  color: $color-text-secondary;
  max-width: 620px;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.error-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.error-card__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: $font-size-md;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.error-card__link--primary {
  background: $color-text-primary;
  color: $color-white;
  border-color: $color-text-primary;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.error-card__link--primary:hover,
.error-card__link--primary:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
}

.error-card__link--ghost {
  background: $color-button-hover-bg;
  color: $color-text-primary;
  border-color: $color-button-hover-border;
}

.error-card__link--ghost:hover,
.error-card__link--ghost:focus-visible {
  transform: translateY(-1px);
  background: $color-white;
}

@media (max-width: 900px) {
  .error-card {
    padding: 2.25rem;
  }

  .error-card__title {
    font-size: $font-size-2xl;
  }

  .error-card__message {
    font-size: $font-size-md;
  }
}

@media (max-width: 640px) {
  .error-page {
    flex-direction: column;
  }

  .error-page__content {
    width: 100%;
    padding: 1.5rem;
  }

  .error-card {
    padding: 1.75rem;
  }

  .error-card__title {
    font-size: $font-size-xl;
  }
}
</style>
