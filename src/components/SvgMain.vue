<template>
  <div>
    <svg id="mainsvg" width="100%" height="600" :view-box.camel="'0 0 ' + viewx + ' ' + viewy" @wheel.self.prevent="resize">
      <svgNode
        v-for="(node, index) in tree.elements"
        :x="600/tree.getCountInLevel(tree.getLevel(index)) + 2*(600/tree.getCountInLevel(tree.getLevel(index)))*tree.getNumInRow(index)"
        :y="130*Math.floor(Math.log2(index+1))"
        :width="100/Math.pow(1.2,tree.getLevel(index))"
        :height="100/Math.pow(1.2,tree.getLevel(index))"
        :stroke-width="2"
        :fill="node?'#ff0000':'#fff'"
        v-b-popover.hover.auto="node?`Value: ${node.value}`:''"
        :title="node?`key: ${node.key}`:''"
        :key="index"
        :kv="node && node.key"
      >
      </svgNode>
      <svgLine
        v-for="node, index in tree.elements.slice(1)"
        :x1="600/tree.getCountInLevel(tree.getLevel(index+1)) + 2*(600/tree.getCountInLevel(tree.getLevel(index+1)))*tree.getNumInRow(index+1) + 50/Math.pow(1.2,tree.getLevel(index+1))"
        :y1="130*Math.floor(Math.log2(index+2))"
        :x2="600/tree.getCountInLevel(tree.getLevel(tree.getParentNode(index+1))) + 2*(600/tree.getCountInLevel(tree.getLevel(tree.getParentNode(index+1))))*tree.getNumInRow(tree.getParentNode(index+1))+50/Math.pow(1.2,tree.getLevel(index+1))"
        :y2="130*Math.floor(Math.log2(tree.getParentNode(index+1)+1))+100/Math.pow(1.2,tree.getLevel(index+1)-1)"
        :key="index"
        :index="index"
      ></svgLine>
    </svg>
  </div>

</template>

<script>


export default {
  name: 'SvgMain',
  props: ['tree'],
  data () {
    return {
      fill: '#ff0033',
      viewx: 1100,
      viewy: 1100,
      viewbox: `0 0 1100 1100`
    }
  },
  methods: {
    resize: function (e) {
      this.viewx+= e.deltaY;
      this.viewy+= e.deltaY;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
