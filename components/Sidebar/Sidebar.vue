<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--collapsed': isCollapsed,
      'sidebar--preopening': preparingOpen
    }"
  >
    <div class="sidebar__header">
      <div class="sidebar__header-content">
        <img
          :src="user.avatar"
          :alt="user.name + ' avatar'"
          class="sidebar__avatar"
        />
        <div v-show="!isCollapsed" class="sidebar__user-info">
          <div class="sidebar__user-name">{{ user.name }}</div>
          <div class="sidebar__user-email">{{ user.email }}</div>
        </div>
      </div>
    </div>
    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <SidebarItem
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          :icon="item.icon"
          :label="item.label"
          :badge="item.badge"
          :collapsed="isCollapsed"
        />
      </ul>
    </nav>
    <div class="sidebar__footer">
      <ButtonIcon v-show="!isCollapsed" icon="/search.svg" title="Search" />
      <ButtonIcon v-show="!isCollapsed" icon="/settings.svg" title="Settings" />
      <ButtonIcon v-show="!isCollapsed" icon="/help-circle.svg" title="Help" />
      <ButtonIcon
        icon="/align-left.svg"
        :title="collapseTitle"
        :class="collapseClass"
        @click="toggleSidebar"
      />
    </div>
  </aside>
</template>

<script>
import navigationItems from '~/data/navigation.json'
import user from '~/data/user.json'

export default {
  name: 'Sidebar',
  data() {
    return {
      navigationItems,
      user,
      isCollapsed: false,
      preparingOpen: false,
      windowWidth: 0
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    this.checkViewportAndCollapse()
    window.addEventListener('resize', this.onWindowResize, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  computed: {
    collapseTitle() {
      return this.isCollapsed ? 'Open sidebar' : 'Collapse sidebar'
    },
    collapseClass() {
      return { 'sidebar__collapse-btn--rotated': this.isCollapsed }
    }
  },
  methods: {
    onWindowResize() {
      this.windowWidth = window.innerWidth
      this.checkViewportAndCollapse()
    },
    checkViewportAndCollapse() {
      if (this.windowWidth < 1080) {
        this.isCollapsed = true
      } else if (
        this.windowWidth >= 1080 &&
        this.isCollapsed &&
        !this.preparingOpen
      ) {
        this.isCollapsed = false
      }
    },
    toggleSidebar() {
      if (this.isCollapsed) {
        this.preparingOpen = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.isCollapsed = false
            this.preparingOpen = false
          }, 200)
        })
        return
      }

      this.isCollapsed = true
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 20vw;
  min-width: 250px;
  max-width: 320px;
  background-color: $color-sidebar-bg;
  color: $color-text-primary;
  padding: 2rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar--collapsed {
  width: auto;
  min-width: auto;
  padding: 2rem 1rem 1.5rem 1rem;
}

.sidebar__header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.sidebar__header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.sidebar__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  position: relative;
  left: 0;
  transition:
    left 0.2s ease,
    transform 0.2s ease;
  z-index: 0;
}

.sidebar--collapsed .sidebar__avatar {
  left: 50%;
  transform: translateX(-50%);
}

.sidebar--preopening .sidebar__avatar {
  left: 0;
  transform: translateX(0);
}

.sidebar__user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
  opacity: 1;
  position: relative;
  z-index: 1;
}

.sidebar--collapsed .sidebar__user-info {
  opacity: 0;
  pointer-events: none;
}

.sidebar__user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: $color-text-primary;
}

.sidebar__user-email {
  font-size: 0.75rem;
  color: $color-text-secondary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
  margin-top: auto;
}

.sidebar--collapsed .sidebar__footer {
  justify-content: center;
  padding: 1rem 0.5rem 0 0.5rem;
}

.sidebar__collapse-btn--rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
