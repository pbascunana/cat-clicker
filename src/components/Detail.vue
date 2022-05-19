<template>
  <div class="details">
    <span>Número de visitas: <b>{{ details.views }}</b></span>
    <span v-if="details.name">Nombre del gato: <b>{{ details.name }}</b></span>
    <img alt="cat" :src="details.url" width="400" @click="addCatViews" />
  </div>
</template>

<script>
export default {
  name: "CatDetailsComponent",
  props: {
    details: { type: Object, required: true }
  },
  methods: {
    addCatViews() {
      this.$emit('clickImage', { views: ++this.details.views, id: this.details.id });
    }
  }
}
</script>

<style lang="scss" scoped>
.details {
  width: 50%;
  margin: 1rem;
  text-align: center;

  span {
    display: block;
    font-size: 1.5em;
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 800px) {
    width: auto;
    text-align: center;
  }
}
</style>
