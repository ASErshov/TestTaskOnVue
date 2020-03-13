<template>
  <div class="mainPage">
    <NewUserForm />
    <DataTable />
    <PopupForm v-if="editRecord.flag " :record="editRecord" />
  </div>
</template>

<script>
import DataTable from '../DataTable/DataTable'
import NewUserForm from '../UserForm/UserForm'
import PopupForm from '../PopupForm/PopupForm'

import {mapGetters} from 'vuex'

export default {
  name: 'mainPage',
  components: {
    DataTable,
    NewUserForm,
    PopupForm
  },
  computed: mapGetters(['editRecord'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.mainPage
  display: flex
  flex-direction: column
  align-items: center
  height: 100%
  justify-content: center
</style>
