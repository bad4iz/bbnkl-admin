/* eslint-disable no-unused-vars,no-param-reassign */
import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';

Vue.use(Vuex);

const HTTP = axios.create({
  baseURL: 'https://dev.bbnkl.ru',
  headers: {
    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
  },
});

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    token: JSON.parse(localStorage.getItem('token')) || '',
    username: 'filin49@yandex.com',
    password: '',
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserName(state) {
      return state.username;
    },
    getPassword(state) {
      return state.password;
    },
  },
  mutations: {
    set(state, { type, item }) {
      localStorage.setItem(type, JSON.stringify(item));
      state[type] = item;
    },
  },
  actions: {
    auth({ commit }, password) {
      const formData = new FormData();
      formData.append('username', this.getters.getUserName);
      formData.append('password', password);
      HTTP.post('/auth/login', formData)
        .then((res) => {
          commit('set', { type: 'token', item: res.data.access_token });
        })
        .catch((er) => {
          console.log(er);
        });
    },
    setUserName({ commit }, data) {
      commit('set', { type: 'username', item: data });
    },
  },
});
