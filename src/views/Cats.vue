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
      :details="catDetails"
      @clickImage="addViewHandler">
    </Detail>
  </div>
</template>

<script>
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
      this.catDetails = {
        id: this.catList[index].id,
        url: this.catList[index].url,
        views: this.catList[index].views,
        name: this.catList[index].breeds.length > 0 
                ? this.catList[index].breeds[0].name 
                : ''
      }
      this.isDetailVisible = true;
    },
    addViewHandler(value) {
      let index = this.catList.findIndex((cat) => cat.id === value.id);
      this.catList[index].views = value.views;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;

  @media only screen and (max-width: 800px) {
    display: grid;
    text-align: center;
  }
}
</style>
