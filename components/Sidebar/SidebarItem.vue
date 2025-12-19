<template>
  <li class="sidebar-item">
    <nuxt-link
      :to="to"
      :exact="to === '/'"
      class="sidebar-item__link"
      :title="collapsed ? label : null"
    >
      <span class="sidebar-item__icon-wrapper">
        <img :src="icon" :alt="label + ' icon'" class="sidebar-item__icon" />
        <span
          v-show="badge && collapsed"
          class="sidebar-item__badge sidebar-item__badge--condensed"
        >
          {{ badge }}
        </span>
      </span>
      <span v-show="!collapsed" class="sidebar-item__label">{{ label }}</span>
      <span
        v-show="badge && !collapsed"
        class="sidebar-item__badge sidebar-item__badge--expanded"
      >
        {{ badge }}
      </span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    badge: {
      type: [Number, null],
      default: null
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  margin-bottom: 0.5rem;
  display: flex;
}

.sidebar--collapsed .sidebar-item {
  justify-content: center;
}
.sidebar-item__link {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: $color-text-primary;
  font-size: $font-size-md;
  text-decoration: none;
  border-radius: 12px;
  transition:
    background-color 0.2s,
    padding 0.5s ease;
  justify-content: flex-start;

  &:hover {
    background-color: $color-sidebar-active;
  }
}

.sidebar--collapsed .sidebar-item__link {
  justify-content: center;
  background-color: transparent;
}

.sidebar-item__link.nuxt-link-active,
.sidebar-item__link.nuxt-link-exact-active {
  background-color: $color-sidebar-active;
  font-weight: 500;
}

.sidebar-item__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.sidebar-item__label {
  transition: opacity 0.3s ease;
}

.sidebar--collapsed .sidebar-item__label {
  opacity: 0;
}

.sidebar-item__icon-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-item__badge {
  background-color: $color-badge-bg;
  color: $color-white;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: $font-size-sm;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.sidebar-item__badge--expanded {
  margin-left: auto;
}

.sidebar--collapsed .sidebar-item__badge--expanded {
  opacity: 0;
}

.sidebar-item__badge--condensed {
  position: absolute;
  top: -6px;
  right: -12px;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  font-size: $font-size-xs;
  line-height: 1;
}
</style>
