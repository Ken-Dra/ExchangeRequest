<template>
  <div class="container">
    <p class="heading">Вход</p>
    <div class="box">
      <p>Имя</p>
      <div><input type="text" id="username" name="username" required v-model="username" placeholder="Введите имя"></div>
    </div>
    <div class="box">
      <p>Пароль</p>
      <div><input type="password" id="password" name="password" required v-model="password"
                  placeholder="Введите пароль"></div>
    </div>
    <button class="loginBtn" @click="submit">Войти</button>
    <p class="text">Нет аккаунта? <a @click="$router.push('/register')">Зарегистрироваться</a></p>
  </div>
</template>

<script>
import {required, maxLength, minLength} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: "login",
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      username: "",
      password: ""
    }
  },
  validations() {
    return {
      username: {
        required,
        maxLengthValue: maxLength(16),
      },
      password: {
        required,
        maxLengthValue: maxLength(20),
        minLengthValue: minLength(4),
      }
    }
  },
  methods: {
    login: function () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', {username, password})
        .then(() => {
          this.$router.push('/')
          location.reload()
          this.$store.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err),
            alert('Ошибка авторизации. Проверьте введенные данные и попробуйте еще раз.')
        })
    },
    async submit() {
      const result = await this.v$.$validate()
      if (!result) {
        alert("Неправильно заполнена форма. Проверьте введенные данные и попробуйте еще раз.")
        return
      }
      this.login()
    }
  }
}
</script>

<style scoped>


body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
}

.container {
  background: white;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #007cff;
  padding: 2em
}

.heading {
  font-size: 2em;
  margin-bottom: 0.5em
}

.box {
  margin: 0.2em 0;
  margin-top: 16px;
}

.container
.box p {
  color: black;
}

.container .box div {
  position: relative;
  width: 100%;
  height: 40px;
  margin: 0.2em 0
}

.container .box input {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  color: black;
  border: none;
  outline: none;
  padding-left: 0.8em;
  border-radius: 10px;
  transition: all 0.5s
}

.container .box input:focus::placeholder {
  color: black
}

.container .box div::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 102%;
  height: 105%;
  border-radius: 10px;
  background: #007cff
}

.loginBtn {
  width: 102%;
  height: 40px;
  border-radius: 10px;
  margin: 0.2em 0;
  transform: translate(-1%);
  cursor: pointer;
  color: black;
  background: #007cff;
  transition: all 0.5s
}

.loginBtn:hover {
  transform: translate(-1%, 5%);
  box-shadow: 0 0 10px #007cff
}

.text {
  font-size: 0.8em;
  margin-top: 0.5em;
  text-align: center;
  color: black;
}

.text a {
  color: #007cff;
}
</style>
