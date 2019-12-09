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
// dashboard
import dashboard from '@/components/dashboard'
// user
import account_setting from '@/components/user/account_setting'
import atm_support from '@/components/user/atm_support'
import user from '@/components/user/user'
import customer_data from '@/components/user/customer_data'


// import user from '@/components/user/user'
// import signedup_check from '@/components/user/signedup_check'
// import signeduproot from '@/components/user/signuproot'
// import signedup_user from '@/components/user/signedup_user'
// import tosignup_check from '@/components/user/tosignup_check'
// import investor_infor from

// settting
import setting from '@/components/settting/setting'

//audit_log
import  audit_log from '@/components/Aduit_logs/audit_log'

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
      title: '首页'
    },
    redirect: '/home/user/atm_support',
    children: [
      {
      path: 'user',
      name: 'user',
      component: user,
      meta: {
        title: '项目列表'
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

      // redirect: '/home/setting/setting',
      // children: [
      //   {
      //     path: 'setting',
      //     name: 'setting',
      //     component: setting
      //   },
      // ]
    },
      {
        path: 'audit_log',
        name: 'audit_log',
        component:audit_log,
        meta: {
          title: ''
        },
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
