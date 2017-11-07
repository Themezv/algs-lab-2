<template>
  <div>
    <svg width="100%" height="600" viewBox="0 0 600 600">
      <svgNode
        v-for="(node, index) in tree.elements.filter(element => !!element)"
        :x="600/2"
        :y="110*Math.floor(Math.log2(index+1))" :width="100"
        :height="100" :stroke-width="2"
        :fill="'#ff0000'"
        v-b-popover.hover.auto="node?`Value: ${node.value}`:''"
        :title="node?`key: ${node.key}`:''"
        :key="node.key"
      >
      </svgNode>
    </svg>
  </div>

</template>

<script>

export default {
  name: 'SvgMain',
  props: ['tree'],
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
