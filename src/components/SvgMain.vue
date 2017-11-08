<template>
  <div>
    <svg id="mainsvg" width="100%" height="600" :view-box.camel="'0 0 ' + viewx + ' ' + viewy" @wheel.self.prevent="resize">
      <svgNode
        v-for="(node, index) in tree.elements"
        :x="600/getCountInLevel(getLevel(index)) + 2*(600/getCountInLevel(getLevel(index)))*getNumInRow(index)"
        :y="130*Math.floor(Math.log2(index+1))"
        :width="100/Math.pow(1.2,getLevel(index))"
        :height="100/Math.pow(1.2,getLevel(index))"
        :stroke-width="2"
        :fill="node?'#ff0000':'#fff'"
        v-b-popover.hover.auto="node?`Value: ${node.value}`:''"
        :title="node?`key: ${node.key}`:''"
        :key="index"
      >
      </svgNode>
      <svgLine
        v-for="node, index in tree.elements.slice(1)"
        :x1="600/getCountInLevel(getLevel(index+1)) + 2*(600/getCountInLevel(getLevel(index+1)))*getNumInRow(index+1) + 50/Math.pow(1.2,getLevel(index+1))"
        :y1="130*Math.floor(Math.log2(index+2))"
        :x2="600/getCountInLevel(getLevel(tree.getParentNode(index+1))) + 2*(600/getCountInLevel(getLevel(tree.getParentNode(index+1))))*getNumInRow(tree.getParentNode(index+1))+50/Math.pow(1.2,getLevel(index+1))"
        :y2="130*Math.floor(Math.log2(tree.getParentNode(index+1)+1))+100/Math.pow(1.2,getLevel(index+1)-1)"
        :key="index"
        :index="index"
      ></svgLine>
    </svg>
    <ul>
        <li v-for="node, index in tree.elements.filter((element) => !!element).slice(1)">{{node.value}}</li>
      </ul>
  </div>

</template>

<script>
  function getLevel(index) {
    return Math.floor(Math.log2(index+1));
  }

  function getCountInLevel (level) {
    return Math.pow(2, level);
  }

  function getNumInRow(index) {
    let i = 1;
    let index2 = index;
    while (i<getCountInLevel(getLevel(index))){
      index2-=i;
      i*=2;
    }
    return index2;
  }

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
    getLevel: getLevel,
    getNumInRow,
    getCountInLevel,
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
