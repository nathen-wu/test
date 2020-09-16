<template>
  <part-component></part-component>
</template>

<script>
import partComponent from './part/partComponent'

let name = '张三';
export default {
  name: 'modulePart1',
  components: {partComponent},
  data () {
    return {
      name
    }
  }
}
</script>

<style scoped type="text/less">

</style>
