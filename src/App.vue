<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default ({
  setup() {


  },
  async mounted() {
    await this.$store.commit('initialiseStore')
  },
})
</script>