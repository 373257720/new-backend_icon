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
import user from '@/components/user/user'
import customer_data from '@/components/user/customer_data'

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
    redirect: '/home/user/atm_support',
    children: [
      {
      path: 'user',
      name: 'user',
      component: user,
      meta: {
        title: ''
      },
      redirect: '/home/user/atm_support',
      children: [
        {
          path: 'customer_data',
          name: 'customer_data',
          component: customer_data
        },
        {
          path: 'atm_support',
          name: 'atm_support',
          component: atm_support,
        },

        {
          path: 'account_setting',
          name: 'account_setting',
          component: account_setting
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
        path: 'compliance',
        name: 'compliance',
        component:compliance,
        meta: {
          title: ''
        },
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
      }
        // {
        //   path: 'signedup',
        //   name: 'signedup',
        //   component: signedup,
        //   redirect: '/home/user/signedup/',
        //   meta: {
        //     title: '已签约'
        //   },
        //   children: [{
        //       path: '/',
        //       name: '',
        //       component: signeduproot
        //     },
        //     {
        //       path: 'signedup_user',
        //       name: 'signedup_user',
        //       component: signedup_user
        //     },
        //     {
        //       path: 'signedup_check',
        //       name: 'signedup_check',
        //       component: signedup_check
        //     },
        //
        //   ]
        // },


      // {
      //   path: 'userlist',
      //   name: 'userlist',
      //   component: userlist,
      //   meta: {
      //     title: '用户列表'
      //   },
      //   redirect: '/home/userlist/verified_user',
      //   children: [{
      //       path: 'check_pending',
      //       name: 'check_pending',
      //       component: check_pending,
      //       // redirect: '/home/userlist/check_pending',
      //       meta: {
      //         title: '待审核'
      //       },
      //       children: [{
      //           path: '/',
      //           name: '',
      //           component: check_pendingroot
      //         },
      //         {
      //           // 发现
      //           path: 'check',
      //           name: 'check',
      //           component: check_pendingcheck
      //         },
      //       ]
      //     },
      //     {
      //       path: 'verified_user',
      //       name: 'verified_user',
      //       component: verified_user,
      //       redirect: '/home/userlist/verified_user/',
      //       meta: {
      //         title: '已验证用户'
      //       },
      //       children: [{
      //           path: '/',
      //           name: '',
      //           component: userroot
      //         },
      //         {
      //           path: 'usercheck',
      //           name: 'usercheck',
      //           component: verified_usercheck
      //         },
      //       ]
      //     },
      //   ]
      // },
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
