<template>
  <main>
    <b-container fluid>
      <b-row>
        <b-col md="9">
          <SvgMain :tree="tree" />
        </b-col>
        <b-col md="3">
          <span class="text-success">Artem Zverev</span><br>
          <b-input-group>
            <b-input-group-addon>
              Value
            </b-input-group-addon>
            <b-form-textarea v-model="newValue" placeholder="содержимое узла"></b-form-textarea>
          </b-input-group>

          <b-input-group class="mt-2">
            <b-input-group-addon>
              Key
            </b-input-group-addon>
            <!-- Main form input -->
            <b-form-input v-model="newKey"></b-form-input>
            <!-- Attach Right button Group via slot -->
            <b-input-group-button slot="right">
              <b-btn @click="addNode" variant="info">Добавить</b-btn>
            </b-input-group-button>
          </b-input-group>
          {{tree.elements}}
          <br>
          <b-btn @click="cleareTree" variant="danger">Очистить дерево </b-btn>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
  import SvgMain from '@/components/SvgMain.vue'
  import Vue from 'vue'

  class Tree {
    constructor () {
      this.elements = []
    }
    addNode (node) {
      if (this.elements.length < 1) {
        this.elements.push(node, null, null);
        console.log('Push root element', node, this.elements);
        return;
      }
      for(let i = 0; i < this.elements.length; i++){
        if(!this.elements[i]){
          Vue.set(this.elements, i, node);
          console.log('Push element', node, this.elements);
          return;
        }
        if(this.elements[i].key > node.key){
          i = i*2;
          console.log('left', i+1);
        }
        else {
          i = i*2 + 1;
          console.log('right', i+1);
        }
        if (i+1  >= this.elements.length){
          this.realloc();
        }
      }
    }
    getLeftChildIndex (index) {
      return 2*index;
    }
    getRightChildIndex (index) {
      return 2*index + 1;
    }
    getParentNode(index) {
      return Math.floor((index-1)/2)
    }
    clearTree () {
      this.elements.splice(0)
    }
    realloc () {
      console.log('realloc', this.elements);
      let arrayLength = this.elements.length;
      for(let j = 0; j <= arrayLength; j++){
        this.elements.push(null);
      }
      console.log('realloc-end', this.elements);
    }

  }

  export default {
    name: 'Main',
    data () {
      return {
        newKey: '',
        newValue: '',
        tree: new Tree()
      }
    },
    methods: {
      addNode: function () {
        this.tree.addNode({key: +this.newKey, value: this.newValue})
      },
      cleareTree: function () {
        this.tree.clearTree()
      }
    },
    components: {SvgMain}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  main {
    width: 100%;
    min-height: 600px;
    svg {
      display: block;
    }
  }
</style>
