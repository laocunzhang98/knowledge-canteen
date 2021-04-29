import Vue from 'vue';
import {
  Input, Button, Row, Col, Tabs, TabPane, Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownMenu, DropdownItem
  ,Card,InfiniteScroll,Upload,Dialog,Calendar,DatePicker,Table,TableColumn,Tag,Form,FormItem,Select,Option,Backtop,Icon,Progress,MessageBox,Message
,Radio,Checkbox,Tree,Rate,RadioButton} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
// import vue from '../main';

Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Calendar)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Select)
Vue.use(Option)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Tree)
Vue.use(Rate)
Vue.use(RadioButton)
// Vue.use(MessageBox)
Vue.use(InfiniteScroll)
