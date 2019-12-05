import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import logo from '@/components/logo'
import login from '@/components/login'



// project
import tosignuproot from '@/components/project/tosignuproot'
import tosignup from '@/components/project/tosignup'
import signedup from '@/components/project/signedup'
import project from '@/components/project/project'
import signedup_check from '@/components/project/signedup_check'
import signeduproot from '@/components/project/signuproot'
import signedup_user from '@/components/project/signedup_user'
import addproject_ch from '@/components/project/addproject_ch'
import addproject_eng from '@/components/project/addproject_eng'
import tosignup_check from '@/components/project/tosignup_check'
import investor_infor from '@/components/project/investor_infor'

// userslist
import check_pending from '@/components/userlist/check_pending'
import check_pendingroot from '@/components/userlist/check_pendingroot'
import verified_user from '@/components/userlist/verified_user'
import userroot from '@/components/userlist/verified_useroot'
import verified_usercheck from '@/components/userlist/verified_usercheck'
import check_pendingcheck from '@/components/userlist/check_pendingcheck'
import userlist from '@/components/userlist/userlist'
// 2级路由userlist/


// moblie

Vue.use(Router);
const routes = [
  {
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
    redirect: '/home/project/tosignup',
    children: [{
        path: 'project',
        name: 'project',
        component: project,
        meta: {
          title: '项目列表'
        },
        redirect: '/home/project/tosignup',
        children: [{
          path: 'tosignup',
          name: 'tosignup',
          redirect: '/home/project/tosignup',
          component: tosignup,
          meta: {
            title: '全部项目'
          },
          children: [{
              path: '/',
              name: '',
              component: tosignuproot
            },
            {
              path: 'tosignup_check',
              name: 'tosignup_check',
              component: tosignup_check,

            },
            {
              path: 'investor_infor',
              name: 'investor_infor',
              component:investor_infor,

            },
            {
              path: 'addproject_ch',
              name: 'addproject_ch',
              component: addproject_ch
            },
            {
              path: 'addproject_eng',
              name: 'addproject_eng',
              component: addproject_eng,
            },
          ]
        }, 
        {
          path: 'signedup',
          name: 'signedup',
          component: signedup,
          redirect: '/home/project/signedup/',
          meta: {
            title: '已签约'
          },
          children: [{
              path: '/',
              name: '',
              component: signeduproot
            },
            {
              path: 'signedup_user',
              name: 'signedup_user',
              component: signedup_user
            },
            {
              path: 'signedup_check',
              name: 'signedup_check',
              component: signedup_check
            },

          ]
        }, ]
      },
      {
        path: 'userlist',
        name: 'userlist',
        component: userlist,
        meta: {
          title: '用户列表'
        },
        redirect: '/home/userlist/verified_user',
        children: [{
            path: 'check_pending',
            name: 'check_pending',
            component: check_pending,
            // redirect: '/home/userlist/check_pending',
            meta: {
              title: '待审核'
            },
            children: [{
                path: '/',
                name: '',
                component: check_pendingroot
              },
              {
                // 发现
                path: 'check',
                name: 'check',
                component: check_pendingcheck
              },
            ]
          },
          {
            path: 'verified_user',
            name: 'verified_user',
            component: verified_user,
            redirect: '/home/userlist/verified_user/',
            meta: {
              title: '已验证用户'
            },
            children: [{
                path: '/',
                name: '',
                component: userroot
              },
              {
                path: 'usercheck',
                name: 'usercheck',
                component: verified_usercheck
              },
            ]
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
