<template>
    <form @submit.prevent="submit" class="user_form">
        <button class="button_close" v-if="editRecord.flag" v-on:click="closePopup()">×</button>
        <input :class="{ 'errorInput': $v.name.$error }" type="text" placeholder="ФИО" v-model="name" />
        <div class="error_block"><span class="error" v-if="!$v.name.required">Имя не может быть пустым </span></div>
        <input :class="{ 'errorInput': $v.email.$error }" type="text"  placeholder="Почта"  v-model="email" @change="$v.email.$touch()"/>
        <div class="error_block"><span class="error" v-if="!$v.email.email||!$v.email.required">Ведите корректную почту</span></div>
        <input :class="{ 'errorInput': $v.phone.$error }" type="text"  placeholder="Телефон"  v-model="phone" @change="$v.phone.$touch()"/>
        <div class="last_error_block"><span class="error" v-if="!$v.phone.phoneValid">Телефон должен быть введен в одном из следующих форматов <br>
        89103123167<br>
        +7-910-221-22-22<br>
        +7(910)-221-22-22
        </span></div>
        <div class="buttons_block">
          <button v-if="!editRecord.flag" type="submit">Добавить</button>
          <button v-if="editRecord.flag" type="submit" >Изменить</button>
          <button v-if="editRecord.flag" v-on:click="deleteRecord({id:record[0]})">Удалить</button>
        </div>
    </form>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
const isPhone = (value) => /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(value)
export default {
  name: 'userForm',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      submitStatus: null
    }
  },
  props: {
    record: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: mapGetters(['editRecord']),
  methods: {
    ...mapActions(['addPhone', 'editPhoneRecord', 'deleteRecord', 'stopEditRecord']),
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        if (this.record.flag) {
          this.editPhoneRecord(
            {
              id: this.record[0],
              name: this.name,
              email: this.email,
              phone: this.phone
            }
          )
        } else {
          this.addPhone({
            name: this.name,
            email: this.email,
            phone: this.phone
          })
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }
      }
    },
    closePopup () {
      this.stopEditRecord()
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      phoneValid: isPhone
    }
  },
  mounted () {
    if (this.record !== {}) {
      this.name = this.record[1]
      this.email = this.record[2]
      this.phone = this.record[3]
    }
  }
}
</script>

<style lang="sass" scoped>
$heightLine: 1.5em
.user_form
  display: flex;
  flex-direction: column
  align-items: center
  position: relative
  .last_error_block
    height: $heightLine*3
    min-width: 430px
  .error_block
    height: $heightLine
  .buttons_block
    width: 50%
    position: relative
    bottom: $heightLine
    display: flex;
    justify-content: center;
    button:first-child
      margin-left: 0%
    button
      outline: none
      box-shadow: none
      border: none;
      line-height: $heightLine
      background: darkgrey
      cursor: pointer;
      width: 45%
      margin-left: 10%
  .button_close
    position: absolute
    right: 10px
    top: 10px
    outline: none
    box-shadow: none
    border: none;
    line-height: $heightLine
    background: darkgrey
    cursor: pointer;
  input
    outline: none
    border: solid 1px black
    line-height: $heightLine
    width: 50%
  .errorInput
    border: solid 1px red
  .error
    color: red

</style>
