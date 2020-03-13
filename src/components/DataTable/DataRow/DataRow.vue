<template>
  <tr v-on:click="checkEditRecord(data)">
    <td v-for="item in data" :key="item">{{item}}</td>
  </tr>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'dataRow',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: mapActions(['checkEditRecord'])
}
</script>
<style lang="sass" scoped>
tr
  cursor: pointer
</style>
