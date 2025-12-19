<template>
  <div class="default">
    <Sidebar />
    <main class="default__content">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  min-height: 100vh;
}

.default__content {
  flex: 1;
  padding: 2rem;
}
</style>
