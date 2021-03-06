import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    currentUser: null,
    token:'',
    topright: true,
    commondialog: false,
    formobj: {},
  },
  getters: {},
  mutations: {
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
        //    state.isLogin = true
      } else if (user == null) {
        //退出的时候清空sessionStorage里的东西
        // sessionStorage.clear();
        // sessionStorage.setItem('userName', null);
        //  sessionStorage.setItem('userToke','');
        state.currentUser = null;
        //  state.isLogin = false;
      }
    },
    toprightt(state, user) {
      if (user == 'login') {
        state.topright = false;
      } else {
        state.topright = true;
      }

    },
    commondialogfunction(state, isyes) {
      state.commondialog = isyes
      // if (user) {
      //   state.currentUser = user
      //   //    state.isLogin = true
      // } else if (user == null) {
      //   //退出的时候清空sessionStorage里的东西
      //   // sessionStorage.clear();
      //   // sessionStorage.setItem('userName', null);
      //   //  sessionStorage.setItem('userToke','');
      //   state.currentUser = null;
      //   //  state.isLogin = false;
      // }
    },
    settoken_mutation(state, user) {
      if (user) {
        state.token = user
      } else if (user == null) {
        state.currentUser = '';

      }
    },
    submit_formdata_mutation(state, obj) {
      if (obj) {
        state.formobj = obj
      } else if (user == null) {
      }
    },
    reset_mutation(state, usertype) {
      Object.assign(state, usertype)
    },

  },
  actions: {
    reset_actions(context,obj) {
      context.commit('reset_mutation',obj)
    },
    submit_formdata_action(context, obj) {
      context.commit('submit_formdata_mutation', obj)
    },
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    settoken_action(context, user) {
      context.commit('settoken_mutation', user)
    },
    commondialogfunctionaysn(context, status) {
      // console.log(context, status);
      context.commit('commondialogfunction', status)
    },

  }
});
