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

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}
</style>

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
