<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.id">
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cat in catList" :key="cat.id">
        <td v-for="header in headers" :key="header.id">
          <span v-if="header.name !== 'actions'">{{ cat[header.name] }}</span>
          <img v-else alt="viewDetails" :src="'./src/assets/svg/eye-outline.svg'" @click="viewDetails" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { api } from '../api/api.js';

export default {
  name: "CatList",
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
  mounted() {
    this.getCatList();
  },
  methods: {
    async getCatList() {
      const { data } = await api.getCatList();
      this.catList = data.map((cat) => {
        cat.views = 0
        return cat
      })
      console.log(this.catList);
    }
  }
}
</script>

<style>

</style>