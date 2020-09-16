<template>
  <div>
    <part-component></part-component>
    <calendarComponent></calendarComponent>
  </div>
</template>

<script>
import partComponent from './part/partComponent'
import calendarComponent from './part/calendarComponent'

export default {
  name: 'modulePart3',
  components: {
    calendarComponent,
    partComponent,
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped type="text/less">

</style>
