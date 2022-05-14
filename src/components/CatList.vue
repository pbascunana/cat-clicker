<template>
  <Table
    v-if="isTableVisible"
    :headers="headers"
    :rows="catList"
    @selectedRow="catDetails">
  </Table>
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
      ]
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
    catDetails(index) {
      this.catList[index].views += 1;
    }
  }
}
</script>
