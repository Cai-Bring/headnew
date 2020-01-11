import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import { Button, Toast, Cell, CellGroup, Uploader, Dialog, Field, Picker, Icon, Tab, Tabs, List, PullRefresh, SwipeCell, Search } from 'vant';

Vue.use(Button).use(Toast).use(Cell).use(CellGroup).use(Uploader).use(Dialog).use(Field).use(Picker).use(Icon).use(Tab).use(Tabs).use(List).use(PullRefresh).use(SwipeCell).use(Search);

// 引入全局样式
import '@/styles/reset.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
