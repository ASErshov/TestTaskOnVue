export default {
  actions: {
    fetchPhones (ctx) {
      // здесь должно быть что-то вроде
      // const request = await fetch(url через который получаем данные)
      // const data = await request.json()
      // ctx.commit('updatePhonebook', data)
      // ну и естественно перед функцией в таком случае должен стоять asinc
      // но вы просили без запросов к беку так что будет хардкод))
      const headers = [
        {
          alias: 'number',
          text: '№'
        },
        {
          alias: 'name',
          text: 'ФИО'
        },
        {
          alias: 'email',
          text: 'Почта'
        },
        {
          alias: 'phone',
          text: 'Телефон'
        }
      ]
      const phones = [
        {
          id: 1,
          name: 'Иванов Иван Иванович',
          email: 'test@mail.com',
          phone: '+7(123)1231212'
        },
        {
          id: 2,
          name: 'Петров Иван Иванович',
          email: 'test2@mail.com',
          phone: '+7(123)1231212'
        },
        {
          id: 3,
          name: 'Сидоров Иван Иванович',
          email: 'test3@mail.com',
          phone: '+7(123)1231212'
        }
      ]

      ctx.commit('updatePhonebook', phones)
      ctx.commit('updateHeaders', headers)
    },
    addPhone (ctx, data) {
      let phone = {}
      phone.id = ctx.state.phonebook.length + 1
      phone = Object.assign(phone, data)
      ctx.commit('newPhone', phone)
    },
    checkEditRecord (ctx, record) {
      ctx.commit('changeEditRecord', record)
    },
    editPhoneRecord (ctx, record) {
      ctx.commit('editPhone', record)
    },
    deleteRecord (ctx, record) {
      ctx.commit('deletePhone', record)
      ctx.commit('reindexing')
    },
    stopEditRecord (ctx) {
      ctx.commit('setFlagEditrecord')
    }
  },
  mutations: {
    updatePhonebook (state, phones) {
      state.phonebook = phones
    },
    updateHeaders (state, headers) {
      state.headers = headers
    },
    newPhone (state, phone) {
      state.phonebook.push(phone)
    },
    editPhone (state, phone) {
      state.editrecord = {flag: false}
      state.phonebook.splice(phone.id - 1, 1, phone)
    },
    deletePhone (state, record) {
      state.editrecord = {flag: false}
      state.phonebook.splice(record.id - 1, 1)
    },
    changeEditRecord (state, record) {
      state.editrecord = record
      state.editrecord.flag = true
    },
    reindexing (state) {
      state.phonebook = state.phonebook.map((elem, index) => { elem.id = index + 1; return elem })
    },
    setFlagEditrecord (state) {
      state.editrecord = {flag: false}
    }
  },
  state: {
    phonebook: [],
    headers: [],
    editrecord: {flag: false}
  },
  getters: {
    allPhones (state) {
      return state.phonebook
    },
    headers (state) {
      return state.headers
    },
    editRecord (state) {
      return state.editrecord
    }
  }
}
