<template>
  <table class="table">
    <thead class="table__header"> 
      <tr>
        <th
          class="table__header-row" 
          v-for="header in headers" :key="header.id"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="row, index in rows" :key="row.id">
        <td
          class="table__body-row"
          v-for="header in headers" :key="header.id"
        >
          <span v-if="header.name !== 'actions'">
            {{ row[header.name] }}
          </span>
          <img
            v-else
            class="table__body-pointer"
            alt="viewDetails"
            :src="'./src/assets/svg/eye-outline.svg'"
            @click="viewDetails(index)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: "TableComponent",
  props: {
    headers: { type: Array, required: true},
    rows: { type: Array, required: true }
  },
  emits: ['selected-row'],
  methods: {
    viewDetails(index) {
      this.$emit('selected-row', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 50%;
  margin: 1rem;
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

  @media only screen and (max-width: 800px) {
    width: auto;
  }
}
</style>