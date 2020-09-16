<template>
    <div>
        <div :style="{ width: '450px', border: '1px solid #d9d9d9', borderRadius: '4px', margin: '0 auto' }">
            <ta-calendar :fullscreen="false" @panelChange="onPanelChange" />
        </div>
        <ta-rate :defaultValue="2.5" :allowClear="false" allowHalf/>
    </div>
</template>

<script>
  export default {
    name: 'calendarComponent',
    data(){
      return {

      }
    },
    methods: {
      onPanelChange(value, mode) {
        console.log(value, mode);
      },
    }
  }
</script>

<style scoped>

</style>