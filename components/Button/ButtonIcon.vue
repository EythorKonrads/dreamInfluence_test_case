<template>
  <button class="button-icon" :title="title" @click="$emit('click', $event)">
    <img :src="icon" :alt="title" class="button-icon__img" />
  </button>
</template>

<script>
export default {
  name: 'ButtonIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.button-icon {
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.75;
  }
}

.button-icon__img {
  width: 24px;
  height: 24px;
  opacity: 1;
  transition: opacity 0.2s;
}
</style>
