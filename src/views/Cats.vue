<template>
  <div class="container">
    <Table
      v-if="isTableVisible"
      :headers="headers"
      :rows="catList"
      @selectedRow="showDetails">
    </Table>
    <Detail
      v-if="isDetailVisible"
      :details="catDetails">
    </Detail>
  </div>
</template>

<script lang="ts">
import { api } from '../api/api.js';

import Detail from '../components/Detail.vue';
import Table from '../components/Table.vue'
export default {
  name: "Cats",
  components: {
    Detail,
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
</style>
