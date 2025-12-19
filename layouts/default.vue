<template>
  <div :class="['default', { 'default--sidebar-collapsed': sidebarCollapsed }]">
    <Sidebar @collapsed="sidebarCollapsed = $event" />
    <main class="default__content">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      sidebarCollapsed: false
    }
  }
}
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  max-width: 100vw;
}

.default__content {
  flex: 1;
  padding: 2rem 0 2rem 2rem;
  overflow-x: hidden;
  margin-left: clamp(250px, 20vw, 320px);
}

.default--sidebar-collapsed .default__content {
  margin-left: 80px;
  transition: margin-left 0.25s ease;
}
@media (max-width: 768px) {
  .default--sidebar-collapsed .default__content {
    margin-left: 60px;
  }
}
</style>
