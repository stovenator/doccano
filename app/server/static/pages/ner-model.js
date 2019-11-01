import Vue from 'vue';
import NerModel from '../components/ner-model.vue';

new Vue({
  el: '#mail-app',

  components: { NerModel },

  template: '<NerModel />',
});
