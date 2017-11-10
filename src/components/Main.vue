<template>
  <main>
    <b-container fluid>
      <b-row>
        <b-col md="8">
          <SvgMain :tree="tree"/>
        </b-col>
        <b-col md="4">
          <b-alert :show="dismissCountDown" dismissible @dismissed="dismissCountDown=0" v-if="!!infoAlert.length"  variant="info" show>{{infoAlert}}</b-alert>
          <b-alert v-if="!!successAlert.length"  variant="success" show>{{successAlert}}</b-alert>
          <b-alert v-if="!!errorsAlert.length"  variant="danger" show>{{errorsAlert}}</b-alert>
          <b-list-group>
            <b-list-group-item>
              Размер дерева
              <b-badge>{{tree.getLevel(tree.elements.length)}}</b-badge>
            </b-list-group-item>
            <b-list-group-item>
              Количество элементов
              <b-badge>{{tree.elements.filter(element => !!element).length}}</b-badge>
            </b-list-group-item>
          </b-list-group>
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
              <b-btn @click="addNode" variant="success">Добавить</b-btn>
            </b-input-group-button>
            <b-input-group-button slot="right">
              <b-btn @click="findNodeByKey" variant="info">Получить</b-btn>
            </b-input-group-button>
            <b-input-group-button slot="right">
              <b-btn variant="danger">Удалить</b-btn>
            </b-input-group-button>
          </b-input-group>
          <!--{{tree.elements}}-->
          <br>
          <b-btn @click="clearTree" variant="danger">Очистить дерево </b-btn>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
  import SvgMain from '@/components/SvgMain.vue'
  import Vue from 'vue'

  class Tree {
    constructor(parent) {
      this.elements = [];
      this.parent = parent;
    }

    addNode(node) {
      if (this.elements.length < 1) {
        this.elements.push(node, null, null);
        return 1;
      }
      for (let i = 0; i < this.elements.length; i++) {
        if (!this.elements[i]) {
          Vue.set(this.elements, i, node);
          return i;
        }
        if (this.elements[i].key > node.key) {
          i = i * 2;
          console.log('left', i + 1);
        }
        else if(this.elements[i].key < node.key){
          i = i * 2 + 1;
          console.log('right', i + 1);
        }
        else if(this.elements[i].key === node.key) {
          Vue.set(this.elements, i, node);
          return i;
        }
        if (i + 1 >= this.elements.length) {
          this.realloc();
        }
      }
    }

    findNodeByKey(key, del=false) {
      console.log('FIND_BY_KEY', typeof key, key);
      let steps = 0;
      for (let i = 0; i < this.elements.length; i++) {
        console.log('FIND_BY_KEY. ITER: ', i, this.elements[i]);
        steps++;
        if (!!this.elements[i] && this.elements[i].key > key) {
          i = i * 2;
        }
        else if(!!this.elements[i] && this.elements[i].key < key){
          i = i * 2 + 1;
        }
        else if(!!this.elements[i] && this.elements[i].key === key) {
          console.log('KKK');
          if(!del){
            console.log('RETURN WITHOUT DEL');
            return {result: this.elements[i].value, steps}
          }
          else {
            if(!this.elements[i*2+1] && !this.elements[i*2+2]){
              Vue.set(this.elements, i, null);
              this.parent.setInfoAlert(`Найден узел с ключом ${key}. Потомки отсутствуют`);
            } else if(!this.elements[i*2+1]){
              Vue.set(this.elements, i, null);
            }
          }
        }
        if (i >= this.elements.length) {
          console.log('RETURN WITHOUT RESULT');
          return {result: false, steps}
        }
      }
      return {result: false, steps}
    }

    getLeftChildIndex(index) {
      return 2 * index;
    }

    getRightChildIndex(index) {
      return 2 * index + 1;
    }

    getParentNode(index) {
      return Math.floor((index - 1) / 2)
    }

    clearTree() {
      this.elements.splice(0)
    }

    realloc() {
      console.log('realloc', this.elements);
      let arrayLength = this.elements.length;
      for (let j = 0; j <= arrayLength; j++) {
        this.elements.push(null);
      }
      this.parent.setInfoAlert(`Увеличение размера массива. Новый размер: ${arrayLength*2}`);
    }

    getLevel(index) {
      return Math.floor(Math.log2(index + 1));
    }

    getCountInLevel(level) {
      return Math.pow(2, level);
    }

    getNumInRow(index) {
      let i = 1;
      let index2 = index;
      while (i < this.getCountInLevel(this.getLevel(index))) {
        index2 -= i;
        i *= 2;
      }
      return index2;
    }
  }

  export default {
    name: 'Main',
    data() {
      return {
        newKey: '',
        newValue: '',
        tree: new Tree(this),
        successAlert: '',
        errorsAlert: '',
        infoAlert: '',
        dismissSecs: 10,
        dismissCountDown: 10,
        showDismissibleAlert: false,
      }
    },
    methods: {
      addNode: function () {
        let count = this.tree.addNode({key: +this.newKey, value: this.newValue});
        this.setSuccessAlert(`Добавлен узел с ключом ${+this.newKey}, итераций: ${count}`);
      },
      clearTree: function () {
        this.tree.clearTree();
        this.setSuccessAlert('Дерево очищено')
      },
      setSuccessAlert: function(msg){
        this.successAlert = msg;
      },
      setErrorsAlert: function(msg){
        this.errorsAlert = msg;
      },
      setInfoAlert: function(msg){
        this.infoAlert = msg;
      },
      findNodeByKey: function () {
        let key = +this.newKey;
        let answer = this.tree.findNodeByKey(key);
        console.log('ANSWER', answer);
        answer.result ?
          this.setSuccessAlert(`С ключом ${key} найден узел со значением ${answer.result}. Итераций: ${answer.steps}`)
          :
          this.setErrorsAlert(`Узла с ключом ${key} не найдено. Итераций: ${answer.steps}`);
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
