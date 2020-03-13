<template>
    <tr>
        <th v-for="header in dataHeaders" :key="header.alias">{{header.text}}</th>
    </tr>
</template>

<script>
export default {
  name: 'headRow',
  props: {
    dataHeaders: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
