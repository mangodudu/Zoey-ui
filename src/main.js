/*
 * @Author: zoey
 * @Date: 2023-08-28 15:45:37
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-18 10:37:57
 * @Description: 请填写简介
 */
import { createApp } from 'vue'
import App from './App.vue'

import ZoeyButton from './components/button.vue'
import ZoeyDialog from './components/dialog.vue'
import ZoeyInput from './components/input.vue'
import ZoeyUpload from './components/Upload/index.vue'
import ZoeyList from './components/List.vue'
import ZoeyTable from './components/Table/index.vue'
import ZoeyTableColumn from './components/Table/tableColumn.vue'
import ZoeyCopy from './components/copy.vue'
import ZoeyCountDown from './components/countDown.vue'
import ZoeyDatePicker from './components/datePicker.vue'
import ZoeyGoTop from './components/goTop.vue'
import ZoeyPagination from './components/pagination.vue'
import ZoeyProgress from './components/progress.vue'
import ZoeyBreadcrumb from './components/BreadCrumb/breadcrumb.vue'
import ZoeyBreadcrumbItem from './components/BreadCrumb/breadcrumbItem.vue'
import ZoeyCard from './components/card.vue'
import ZoeyMenu from './components/NavMenu/menu.vue'
import ZoeyMenuItem from './components/NavMenu/menuItem.vue'
import ZoeyMenuItemGroup from './components/NavMenu/menuItemGroup.vue'
import ZoeySubmenu from './components/NavMenu/subMenu.vue'
import ZoeyPopover from './components/popover.vue'

import './assets/newFonts/iconfont.css'
import './assets/css/base.css'
import './assets/css/public.css'

import Message from './components/Message/index.js'
import MessageBox from './components/MessageBox/index.js'


//vue自定义方法
const app = createApp(App).use(router)
app.config.globalProperties.$message = Message
app.config.globalProperties.$confirm = MessageBox
//app.use(store)

//vue自定义指令
import { ZoeyLoading } from './components/Loaing/index.js'

app.directive('loading', ZoeyLoading)


app.component('ZoeyButton', ZoeyButton)
  .component('ZoeyDialog', ZoeyDialog)
  .component('ZoeyInput', ZoeyInput)
  .component('ZoeyUpload', ZoeyUpload)
  .component('ZoeyList', ZoeyList)
  .component('ZoeyCopy', ZoeyCopy)
  .component('ZoeyCountDown', ZoeyCountDown)
  .component('ZoeyDatePicker', ZoeyDatePicker)
  .component('ZoeyTable', ZoeyTable)
  .component('ZoeyTableColumn', ZoeyTableColumn)
  .component('ZoeyGoTop', ZoeyGoTop)
  .component('ZoeyPagination', ZoeyPagination)
  .component('ZoeyProgress', ZoeyProgress)
  .component('ZoeyBreadcrumb', ZoeyBreadcrumb)
  .component('ZoeyBreadcrumbItem', ZoeyBreadcrumbItem)
  .component('ZoeyCard', ZoeyCard)
  .component('ZoeyMenu', ZoeyMenu)
  .component('ZoeyMenuItem', ZoeyMenuItem)
  .component('ZoeyMenuItemGroup', ZoeyMenuItemGroup)
  .component('ZoeySubmenu', ZoeySubmenu)
  .component('ZoeyPopover', ZoeyPopover)


app.mount('#app')
