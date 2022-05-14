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

<style lang="scss" scoped>
.table {
  width: 50%;
  border-collapse: collapse;
  
  &__header {
    &-row {
      width: 20%;
      padding: 1rem 0 .5rem 0;
      border-bottom: 1px solid grey;
    }
  }

  &__body {
    tr {
      border-bottom: 1px solid grey;
      &:hover {
        background: rgb(220,220,220);
      }
    }
    &-row {
      text-align: center;
    }
    &-pointer {
      cursor: pointer;
    }
  }
}
</style>