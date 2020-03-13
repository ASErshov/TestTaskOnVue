<template>
    <div class="table_block">
        <table>
            <thead>
                <HeadRow :dataHeaders="headers" />
            </thead>
            <tbody>
                <DataRow v-for="record in allPhones" :key="record.id" :data="Object.values(record)" />
            </tbody>
        </table>
    </div>
</template>

<script>
import DataRow from './DataRow/DataRow'
import HeadRow from './HeadRow/HeadRow'

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'dataTable',
  computed: mapGetters(['allPhones', 'headers']),
  methods: mapActions(['fetchPhones']),
  components: {
    HeadRow,
    DataRow
  },
  mounted () {
    this.fetchPhones()
  }
}
</script>

<style lang="sass" scoped>
.table_block
    overflow: auto;
    width: max-content;
</style>
