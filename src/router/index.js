import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import logo from '@/components/logo'
import login from '@/components/login'

// 添加这下面一段代码，就可以解决报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

// account
import  account from '@/components/account'
// dashboard
import dashboard from '@/components/dashboard'
// user
import account_setting from '@/components/user/account_setting'
import atm_support from '@/components/user/atm_support'
import atm_supportlist from "../components/user/atm_supportlist";
import user from '@/components/user/user'
import customer_data from '@/components/user/customer_data'
// machines
import machines from '@/components/machines/machines'
import group_pattern  from "../components/machines/group_pattern";
import remote_control_records from  '@/components/machines/remote_control_records'
import machines_lists from '@/components/machines/machines_lists'
import machines_edit from '@/components/machines/machines_edit'
import add_Group_Pattern from '@/components/machines/add_Group_Pattern'
import edit_Group_Pattern from '@/components/machines/edit_Group_Pattern'
import add_1st from '@/components/machines/add_1st'
import add_2nd from '@/components/machines/add_2nd'
import add_3rd from '@/components/machines/add_3rd'
import add_4th from "../components/machines/add_4th";
import edit_1st from '@/components/machines/edit_1st'
import edit_2nd from '@/components/machines/edit_2nd'
import edit_3rd from '@/components/machines/edit_3rd'
import edit_4th from '@/components/machines/edit_4th'
import  test from '@/components/test'
import machine_subtitle from "../components/machines/machine_subtitle";
import group_subtitle from "../components/machines/group_subtitle";
// alerts
import  alerts from '@/components/alerts/alerts'
import  alerts_lists from '@/components/alerts/alerts_lists'
import  alerts_details from  '@/components/alerts/alerts_details'
// settting
import setting from '@/components/settting/setting'
import  setting_edit from '@/components/settting/setting_edit'
import  setting_list from '@/components/settting/setting_list'
//audit_log
import  audit_log from '@/components/Aduit_logs/audit_log'
import setting_edit_lists from '@/components/Aduit_logs/audit_log_list'
import  cashbox_log from  '@/components/Aduit_logs/cashbox_log';
import  error_log from  '@/components/Aduit_logs/error_log';
import  machine_connect_status from  '@/components/Aduit_logs/machine_connect_status';

import transaction from '@/components/transaction/transaction'
import  transaction_lists from '@/components/transaction/transaction_lists'
import  transaction_details from "@/components/transaction/transaction_details"
// complaince
import  compliance from '@/components/compliance/compliance'
// report
import report from "../components/report/report";
import report_lists from "../components/report/report_lists";
import report_crytocurrency from "../components/report/report_crytocurrency";
// wallet
import wallet from "../components/wallet/wallet";
import wallet_lists from "../components/wallet/wallet_lists";
import wallet_edit from "../components/wallet/wallet_edit";
// import verified_user from '@/components/userlist/verified_user'
// import userroot from '@/components/userlist/verified_useroot'
// import verified_usercheck from '@/components/userlist/verified_usercheck'
// import check_pendingcheck from '@/components/userlist/check_pendingcheck'
// import userlist from '@/components/userlist/userlist'
// 2级路由userlist/


// moblie

Vue.use(Router);
const routes = [{
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/logo',
    name: 'logo',
    component: logo,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: ''
    },
    redirect: '/home/dashboard',
    children: [
      {
      path: 'user',
      name: 'user',
      component: user,
      meta: {
        title: ''
      },
      // redirect: '/home/user/dashboard',
      children: [
        {
          path: 'atm_support',
          name: 'atm_support',
          component: atm_support,
          redirect: '/home/user/atm_support/atm_supportlist',
          children:[
            {
              path: 'atm_supportlist',
              name: 'atm_supportlist',
              component: atm_supportlist,
            },
            {
              path: 'account_setting',
              name: 'account_setting',
              component: account_setting
            },
          ]
        },
        {
          path: 'customer_data',
          name: 'customer_data',
          component: customer_data
        },
      ]
    },{
      path: 'setting',
      name: 'setting',
      component:setting,
      meta: {
        title: ''
      },
        redirect: '/home/setting/setting_list',
        children: [
          {
            path: 'setting_edit',
            name: 'setting_edit',
            component: setting_edit
          },
          {
            path: 'setting_list',
            name: 'setting_list',
            component: setting_list
          },
        ]
    },
      {
        path: 'audit_log',
        name: 'audit_log',
        component:audit_log,
        meta: {
          title: ''
        },
        redirect: '/home/audit_log/setting_edit_lists',
        children: [
          {
            path: 'setting_edit_lists',
            name: 'setting_edit_lists',
            component: setting_edit_lists,
          },
          {
            path: 'cashbox_log',
            name: 'cashbox_log',
            component: cashbox_log
          },
          {
            path: 'error_log',
            name: 'error_log',
            component: error_log
          },
          {
            path: 'machine_connect_status',
            name: 'machine_connect_status',
            component:machine_connect_status
          },
        ]
      },
      {
        path: 'transaction',
        name: 'transaction',
        component:transaction,
        meta: {
          title: ''
        },
        redirect: '/home/transaction/transaction_lists',
        children: [
          {
            path: 'transaction_lists',
            name: 'transaction_lists',
            component: transaction_lists,
          },
          {
            path: 'transaction_details',
            name: 'transaction_details',
            component: transaction_details
          },
        ]
      },
      {
        path: 'machines',
        name: 'machines',
        component:machines,
        meta: {
          title: ''
        },
        children: [
          {
            path: 'machine_subtitle',
            name: 'machine_subtitle',
            component:machine_subtitle,
            redirect: '/home/machines/machine_subtitle/machines_lists',
            children:[
              {
                path: 'machines_lists',
                name: 'machines_lists',
                component: machines_lists,
              },  {
                path: 'machines_edit',
                name: 'machines_edit',
                component: machines_edit,
                redirect: '/home/machines/machine_subtitle/machines_edit/edit_1st',
                children:[

                  {
                    path: 'edit_1st',
                    name: 'edit_1st',
                    component: edit_1st,
                  },
                  {
                    path: 'edit_2nd',
                    name: 'edit_2nd',
                    component: edit_2nd,
                  },
                  {
                    path: 'edit_3rd',
                    name: 'edit_3rd',
                    component: edit_3rd,
                  },
                  {
                    path: 'edit_4th',
                    name: 'edit_4th',
                    component: edit_4th,
                  },
                  {
                    path: 'test',
                    name: 'test',
                    component: test,
                  },
                ],
              },   {
                path: 'remote_control_records',
                name: 'remote_control_records',
                component: remote_control_records,
              },
            ]
          },
          {
            path: 'group_subtitle',
            name: 'group_subtitle',
            component: group_subtitle,
            redirect: '/home/machines/group_subtitle/group_pattern',
            children:[
              {
                path: 'add_Group_Pattern',
                name: 'add_Group_Pattern',
                component: add_Group_Pattern,
              },
              {
                path: 'edit_Group_Pattern',
                name: 'edit_Group_Pattern',
                component: edit_Group_Pattern,
              },
              {
                path: 'group_pattern',
                name: 'group_pattern',
                component: group_pattern,

              },
            ]
          },




        ]
      },
      {
        path: 'compliance',
        name: 'compliance',
        component:compliance,
        meta: {
          title: ''
        },
      },
      {
        path: 'wallet',
        name: 'wallet',
        component:wallet,
        meta: {
          title: ''
        },
        redirect: '/home/wallet/wallet_lists',
        children:[   {
          path: 'wallet_lists',
          name: 'wallet_lists',
          component: wallet_lists,
        },  {
          path: 'wallet_edit',
          name: 'wallet_edit',
          component: wallet_edit,
        },
        ]
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard,
        meta: {
          title: ''
        },
      },{
        path: 'account',
        name: 'account',
        component: account,
        meta: {
          title: ''
        },
      },
      {
        path: 'alerts',
        name: 'alerts',
        component: alerts,
        meta: {
          title: ''
        },
        redirect: '/home/alerts/alerts_lists',
        children: [
          {
            path: 'alerts_lists',
            name: 'alerts_lists',
            component: alerts_lists,
          },
          {
            path: 'alerts_details',
            name: 'alerts_details',
            component: alerts_details,
          },
        ]
      },
      { path: 'report',
        name: 'report',
        component: report,
        redirect: '/home/report/report_lists',
        children:[
          {
          path: 'report_lists',
          name: 'report_lists',
          component: report_lists,
        },
          {
            path: 'report_crytocurrency',
            name: 'report_crytocurrency',
            component: report_crytocurrency,
          },
        ]
      },

    ]

  },

  {
    path: '*',
    name: 'login',
    component: login
  },
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
]

let router = new Router({
  // mode:'history',
  routes
});
export default router;
