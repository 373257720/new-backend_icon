// 导入自己需要的组件
import Vue from "vue";
import {
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Select,
  Option,
  OptionGroup,
  Input,
  Main,
  // Tree,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Dialog,
  Table,
  CheckboxGroup,
  Tabs,
  TabPane,
  TableColumn,
  Loading,
  Form,
  Upload,
  FormItem,
  Radio,
  Popover,
  MessageBox,
  Collapse,
  Button,
  CollapseItem,
  Message,
  Pagination,
  Checkbox,
  DatePicker
  // Row,
  // Col
} from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
const element = {
  install: function(Vue) {
    Vue.use(Aside);
    Vue.use(CheckboxGroup);
    Vue.use(Select);
    Vue.use(Popover);
    Vue.use(Checkbox);
    Vue.use(Option);
    Vue.use(Button);
    Vue.use(TabPane);
    Vue.use(RadioGroup);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Upload);
    Vue.use(Radio);
    Vue.use(Submenu);
    Vue.use(Pagination);
    Vue.use(MenuItem);
    Vue.use(Menu);
    Vue.use(Input);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Main);
    Vue.use(Tabs);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Table);
    Vue.use(DatePicker);
    Vue.use(TableColumn);

    Vue.use(Loading.directive);
    // Vue.prototype.$msgbox = MessageBox;

    // Vue.use(Option)
    Vue.use(OptionGroup);
    // Vue.use(Input)
    // Vue.use(Tree)
    Vue.use(Dialog);
    // Vue.use(Row)
    // Vue.use(Col)
  }
};
export default element;
