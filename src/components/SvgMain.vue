<template>
    <svg width="100%" height="100%">
      <line x1="0" y1="0" x2="200" y2="200" stroke-width="2" :stroke="fill"></line>
      <svgLine :x1="10" :y1="20" :x2="210" :y2="230" :stroke-width="2" :stroke="fill"></svgLine>
    </svg>
</template>

<script>
export default {
  name: 'SvgMain',
  data () {
    return {
      fill: '#ff0033'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
