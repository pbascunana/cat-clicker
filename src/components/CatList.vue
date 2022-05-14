<template>
  <div class="container">
    <Table
      v-if="isTableVisible"
      :headers="headers"
      :rows="catList"
      @selectedRow="showDetails">
    </Table>
    <div v-if="isDetailVisible" class="details">
      <span>Número de visitas: <b>{{ catDetails.views }}</b></span>
      <span>Nombre del gato: <b>{{ catDetails.name }}</b></span>
      <img alt="cat" :src="catDetails.url" width="400" />
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '../api/api.js';
import Table from './Table.vue';

export default {
  name: "CatList",
  components: {
    Table
  },
  data() {
    return {
      catList: [],
      headers: [
        { id: 1, name: "id" },
        { id: 2, name: "views" },
        { id: 3, name: "width" },
        { id: 4, name: "height" },
        { id: 5, name: "actions" } 
      ],
      catDetails: undefined,
      isDetailVisible: false,
    }
  },
  computed: {
    isTableVisible() {
      return this.catList.length > 0;
    }
  },
  mounted() {
    this.getCatList();
  },
  methods: {
    async getCatList() {
      const { data } = await api.getCatList();
      this.catList = data.map((cat) => {
        cat.views = 0;
        return cat;
      })
    },
    showDetails(index) {
      this.catList[index].views += 1;
      this.catDetails = {
        url: this.catList[index].url,
        views: this.catList[index].views,
        name: this.catList[index].breeds.length > 0 
                ? this.catList[index].breeds[0].name 
                : ''
      }
      this.isDetailVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 1rem;
  display: flex;
}
.details {
  width: 50%;
  margin: 1rem;
  text-align: center;

  span {
    display: block;
    font-size: 1.5em;
    margin-bottom: 2rem;
  }
}
</style>