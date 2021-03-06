import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
// 添加这下面一段代码，就可以解决报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const home = () => import(/* webpackChunkName: "group-foo" */'@/components/home')
const logo = () => import(/* webpackChunkName: "group-foo" */'@/components/logo')
const login = () => import(/* webpackChunkName: "group-foo" */'@/components/login')
const account = () => import(/* webpackChunkName: "group-foo" */'@/components/account')
const dashboard = () => import(/* webpackChunkName: "group-foo" */'@/components/dashboard')

const account_setting = () => import(/* webpackChunkName: "group-foo" */'@/components/user/account_setting')
const atm_support = () => import(/* webpackChunkName: "group-foo" */'@/components/user/atm_support')
const atm_supportlist = () => import(/* webpackChunkName: "group-foo" */'@/components/user/atm_supportlist')
const user = () => import(/* webpackChunkName: "group-foo" */'@/components/user/user')
const customer_data = () => import(/* webpackChunkName: "group-foo" */'@/components/user/customer_data')


const machines = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/machines')
const group_pattern = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/group_pattern')
const remote_control_records = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/remote_control_records')
const machines_lists = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/machines_lists')
const machines_edit = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/machines_edit')
const add_Group_Pattern = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/add_Group_Pattern')
const edit_Group_Pattern = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/edit_Group_Pattern')
const add_1st = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/add_1st')
const add_2nd = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/add_2nd')
const add_3rd = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/add_3rd')
const add_4th = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/add_4th')
const edit_1st = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/edit_1st')
const edit_2nd = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/edit_2nd')
const edit_3rd = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/edit_3rd')
const edit_4th = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/edit_4th')
const edit_5th = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/edit_5th')
const test = () => import(/* webpackChunkName: "group-foo" */'@/components/test')
const machine_subtitle = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/machine_subtitle')
const group_subtitle = () => import(/* webpackChunkName: "group-foo" */'@/components/machines/group_subtitle')


// alerts
const alerts = () => import(/* webpackChunkName: "group-foo" */'@/components/alerts/alerts')
const alerts_lists = () => import(/* webpackChunkName: "group-foo" */'@/components/alerts/alerts_lists')
const alerts_details = () => import(/* webpackChunkName: "group-foo" */'@/components/alerts/alerts_details')
// settting
const setting = () => import(/* webpackChunkName: "group-foo" */'@/components/settting/setting')
const setting_edit = () => import(/* webpackChunkName: "group-foo" */'@/components/settting/setting_edit')
const setting_list = () => import(/* webpackChunkName: "group-foo" */'@/components/settting/setting_list')
//audit_log
const audit_log  = () => import(/* webpackChunkName: "group-foo" */'@/components/Aduit_logs/audit_log')
const setting_edit_lists = () => import(/* webpackChunkName: "group-foo" */'@/components/Aduit_logs/audit_log_list')
const cashbox_log= () => import(/* webpackChunkName: "group-foo" */'@/components/Aduit_logs/cashbox_log')
const error_log = () => import(/* webpackChunkName: "group-foo" */'@/components/Aduit_logs/error_log')
const machine_connect_status = () => import(/* webpackChunkName: "group-foo" */'@/components/Aduit_logs/machine_connect_status')


const transaction= () => import(/* webpackChunkName: "group-foo" */'@/components/transaction/transaction')
const transaction_lists = () => import(/* webpackChunkName: "group-foo" */'@/components/transaction/transaction_lists')
const transaction_details = () => import(/* webpackChunkName: "group-foo" */'@/components/transaction/transaction_details')
// complaince
const promotion = () => import(/* webpackChunkName: "group-foo" */'@/components/promotion/promotion')
const promotionAdd = () => import(/* webpackChunkName: "group-foo" */'@/components/promotion/promotionAdd')
const promotionList = () => import(/* webpackChunkName: "group-foo" */'@/components/promotion/promotionList')

// report
const report = () => import(/* webpackChunkName: "group-foo" */'@/components/report/report')
const report_lists = () => import(/* webpackChunkName: "group-foo" */'@/components/report/report_lists')
const report_crytocurrency = () => import(/* webpackChunkName: "group-foo" */'@/components/report/report_crytocurrency')
// wallet
const wallet = () => import(/* webpackChunkName: "group-foo" */'@/components/wallet/wallet')
const wallet_lists = () => import(/* webpackChunkName: "group-foo" */'@/components/wallet/wallet_lists')
const wallet_edit = () => import(/* webpackChunkName: "group-foo" */'@/components/wallet/wallet_edit')
// 2级路由userlist/


// moblie

Vue.use(Router);
const routes = [{
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '',
      requiretoken: false,
    },
  },
  {
    path: '/logo',
    name: 'logo',
    component: logo,
    meta: {
      requiretoken: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '',
      requiretoken: true,
    },
    redirect: '/home/dashboard',
    children: [{
        path: 'user',
        name: 'user',
        component: user,
        meta: {
          title: '',
          requiretoken: true,
        },
        // redirect: '/home/user/dashboard',
        children: [{
            path: 'atm_support',
            name: 'atm_support',
            component: atm_support,
            redirect: '/home/user/atm_support/atm_supportlist',
            children: [{
                path: 'atm_supportlist',
                name: 'atm_supportlist',
                component: atm_supportlist,
                meta: {
                  title: '',
                  requiretoken: true,
                },
              },
              {
                path: 'account_setting',
                name: 'account_setting',
                component: account_setting,
                meta: {
                  title: '',
                  requiretoken: true,
                },
              },
            ]
          },
          {
            path: 'customer_data',
            name: 'customer_data',
            component: customer_data,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      }, {
        path: 'setting',
        name: 'setting',
        component: setting,
        meta: {
          title: '',
          requiretoken: true,
        },
        redirect: '/home/setting/setting_list',
        children: [{
            path: 'setting_edit',
            name: 'setting_edit',
            component: setting_edit,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'setting_list',
            name: 'setting_list',
            component: setting_list,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      },
      {
        path: 'audit_log',
        name: 'audit_log',
        component: audit_log,
        meta: {
          title: '',
          requiretoken: true,
        },
        redirect: '/home/audit_log/setting_edit_lists',
        children: [{
            path: 'setting_edit_lists',
            name: 'setting_edit_lists',
            component: setting_edit_lists,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'cashbox_log',
            name: 'cashbox_log',
            component: cashbox_log,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'error_log',
            name: 'error_log',
            component: error_log,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'machine_connect_status',
            name: 'machine_connect_status',
            component: machine_connect_status,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      },
      {
        path: 'transaction',
        name: 'transaction',
        component: transaction,
        meta: {
          title: '',
          requiretoken: true,
        },
        redirect: '/home/transaction/transaction_lists',
        children: [{
            path: 'transaction_lists',
            name: 'transaction_lists',
            component: transaction_lists,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'transaction_details',
            name: 'transaction_details',
            component: transaction_details,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      },
      {
        path: 'machines',
        name: 'machines',
        component: machines,
        meta: {
          title: '',
          requiretoken: true,
        },
        children: [{
            path: 'machine_subtitle',
            name: 'machine_subtitle',
            component: machine_subtitle,
            redirect: '/home/machines/machine_subtitle/machines_lists',
            children: [{
              path: 'machines_lists',
              name: 'machines_lists',
              component: machines_lists,
              meta: {
                title: '',
                requiretoken: true,
              },
            }, {
              path: 'machines_edit',
              name: 'machines_edit',
              component: machines_edit,
              redirect: '/home/machines/machine_subtitle/machines_edit/edit_1st',
              children: [

                {
                  path: 'edit_1st',
                  name: 'edit_1st',
                  component: edit_1st,
                  meta: {
                    title: '',
                    requiretoken: true,
                  },
                },
                {
                  path: 'edit_2nd',
                  name: 'edit_2nd',
                  component: edit_2nd,
                  meta: {
                    title: '',
                    requiretoken: true,
                  },
                },
                {
                  path: 'edit_3rd',
                  name: 'edit_3rd',
                  component: edit_3rd,
                  meta: {
                    title: '',
                    requiretoken: true,
                  },
                },
                {
                  path: 'edit_4th',
                  name: 'edit_4th',
                  component: edit_4th,
                  meta: {
                    title: '',
                    requiretoken: true,
                  },
                },
                {
                  path: 'edit_5th',
                  name: 'edit_5th',
                  component: edit_5th,
                  meta: {
                    title: '',
                    requiretoken: true,
                  },
                },
                {
                  path: 'test',
                  name: 'test',
                  component: test,
                  meta: {
                    title: '',
                    requiretoken: true,
                  },
                },
              ],
            }, {
              path: 'remote_control_records',
              name: 'remote_control_records',
              component: remote_control_records,
              meta: {
                title: '',
                requiretoken: true,
              },
            }, ]
          },
          {
            path: 'group_subtitle',
            name: 'group_subtitle',
            component: group_subtitle,
            redirect: '/home/machines/group_subtitle/group_pattern',
            children: [{
                path: 'add_Group_Pattern',
                name: 'add_Group_Pattern',
                component: add_Group_Pattern,
                meta: {
                  title: '',
                  requiretoken: true,
                },
              },
              {
                path: 'edit_Group_Pattern',
                name: 'edit_Group_Pattern',
                component: edit_Group_Pattern,
                meta: {
                  title: '',
                  requiretoken: true,
                },
              },
              {
                path: 'group_pattern',
                name: 'group_pattern',
                component: group_pattern,
                meta: {
                  title: '',
                  requiretoken: true,
                },

              },
            ]
          },
        ]
      },
      // {
      //   path: 'compliance',
      //   name: 'compliance',
      //   component: compliance,
      //   meta: {
      //     title: '',
      //     requiretoken: true,
      //   },
      // },


      {
        path: 'promotion',
        name: 'promotion',
        component: promotion,
        meta: {
          title: '',
          requiretoken: true,
        },
        redirect: '/home/promotion/promotionList',
        children: [{
            path: 'promotionList',
            name: 'promotionList',
            component: promotionList,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'promotionAdd',
            name: 'promotionAdd',
            component: promotionAdd,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      },


      {
        path: 'wallet',
        name: 'wallet',
        component: wallet,
        meta: {
          title: ''
        },
        redirect: '/home/wallet/wallet_lists',
        children: [{
          path: 'wallet_lists',
          name: 'wallet_lists',
          component: wallet_lists,
          meta: {
            title: '',
            requiretoken: true,
          },
        }, {
          path: 'wallet_edit',
          name: 'wallet_edit',
          component: wallet_edit,
          meta: {
            title: '',
            requiretoken: true,
          },
        }, ]
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard,
        meta: {
          title: '',
          requiretoken: true,
        },
      }, {
        path: 'account',
        name: 'account',
        component: account,
        meta: {
          title: '',
          requiretoken: true,
        },
      },
      {
        path: 'alerts',
        name: 'alerts',
        component: alerts,
        meta: {
          title: '',
          requiretoken: true,
        },
        redirect: '/home/alerts/alerts_lists',
        children: [{
            path: 'alerts_lists',
            name: 'alerts_lists',
            component: alerts_lists,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'alerts_details',
            name: 'alerts_details',
            component: alerts_details,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      },
      {
        path: 'report',
        name: 'report',
        component: report,
        redirect: '/home/report/report_lists',
        children: [{
            path: 'report_lists',
            name: 'report_lists',
            component: report_lists,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
          {
            path: 'report_crytocurrency',
            name: 'report_crytocurrency',
            component: report_crytocurrency,
            meta: {
              title: '',
              requiretoken: true,
            },
          },
        ]
      },

    ]

  },
  {
    path: '*',
    // name: 'login',
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

//在进入某个路由前执行的代码
router.beforeEach((to, from, next) => {
  let token = (sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem('store')).token) || store.state
    .token;
  // console.log(token)
  if (to.meta.requiretoken) {
    if (token) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if (to.path === '/login' && token) {
      next();
    } else {
      next();
    }
    // 要进入to路由，必须调用next()方法

  }
});
export default router;
