<template>
    <div class="popup_wraper">
        <div class="popup">
            <UserForm :record="record" />
        </div>
    </div>
</template>
<script>
import UserForm from '../UserForm/UserForm'

export default {
  props: {
    record: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    UserForm
  }
}
</script>
<style lang="sass" scoped>
.popup_wraper
    position: fixed
    height: 100vh
    width: 100vw
    background: rgba(0, 0, 0, 0.7)
    top: 0
    left: 0
    display: flex
    justify-content: center

    .popup
        background: white
        opacity: 1
        margin: auto
        min-width: 400px
        min-height: 300px
        padding-top: 50px
        padding-bottom: 50px
        box-sizing: border-box
        position: relative
        form:first-child
            position: initial
</style>
