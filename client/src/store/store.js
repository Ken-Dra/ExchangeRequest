import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import Config from "../../envConfig";
import qs from "qs";
import jwtDecode from "jwt-decode";



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || {},
    data: {
      countries: localStorage.getItem('countries'),
      currencies: localStorage.getItem('currencies'),
      cities: localStorage.getItem('cities') || '',
      paymentType: localStorage.getItem('paymentType') || '',
      banks: localStorage.getItem('banks') || '',
      purposes: localStorage.getItem('purposes') || '',
    },
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    data_fetched (state, countries, currencies, cities, paymentType, banks, purposes) {
      state.data.countries = countries
      state.data.currencies = currencies
      state.data.cities = cities
      state.data.paymentType = paymentType
      state.data.banks = banks
      state.data.purposes = purposes
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = {}
      state.data = {}
    },
  },
  actions: {
    async login({commit}, user) {
      commit('auth_request')
      await axios({
        url: `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/user/sign-in/`, data: qs.stringify(user), method: 'POST', headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then(resp => {
          const token = resp.data.access_token
          user = jwtDecode(token).user
          localStorage.setItem('token', token)
          localStorage.setItem("user", user)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          console.log(err)
        })
    },
    async register({commit}, user) {
      commit('auth_request')
      await axios({
        url: `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/user/sign-up/`, data: user, method: 'POST', headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      })
        .then(resp => {
          console.log(resp)
          const token = resp.data.access_token
          localStorage.setItem('token', token)
          user = jwtDecode(token).user
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          console.log(err)
        })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  async fetchData({commit}) {
      console.log('getting currencies')
      await axios ({url: `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/currencies`, method: 'GET' })
      // const responseCurrencies = await axios.get(
      //   `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/currencies`
      // )
        .then(resp => {
          const responseCurrencies = resp.data
          localStorage.setItem('currencies', responseCurrencies)
        })
    //   console.log('getting payments')
    //   const responsePaymentTypes = await axios.get(
    //     `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/paymentType`
    //   )
    //   const responseCities = await axios.get(
    //     `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/cities`
    //   )
    //   const responseCountries = await axios.get(
    //     `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/countries`
    //   )
    //   const responseBanks = await axios.get(
    //     `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/banks`
    //   )
    //   const responsePurposes = await axios.get(
    //     `http://${Config.Config.VUE_APP_HOST}:${Config.Config.VUE_APP_PORT}/data/purposes`
    //   )
    //   localStorage.setItem('countries', responseCountries.data);
    //   // localStorage.setItem('currencies', responseCurrencies.data);
    //   localStorage.setItem('paymentType', responsePaymentTypes.data);
    //   localStorage.setItem('cities', responseCities.data);
    //   localStorage.setItem('banks', responseBanks.data);
    //   localStorage.setItem('purposes', responsePurposes.data);
    //   commit('data_fetched', responseCountries.data, responseCurrencies.data, responseCities.data, responsePaymentTypes.data, responseBanks.data, responsePurposes.data);
    // }
        .catch (error => {
      console.log(error)
      alert("Error!");
    })
  },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getData: state => state.data,
    isAdmin: state => {
      try {
        return JSON.parse(state.user)["is_superuser"] === true
      }
      catch (err) {
        console.log(err)
        return false
        }
      }
  }
})
