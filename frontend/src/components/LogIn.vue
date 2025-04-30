<template>
    <div>
      <br/>
      <br/>
      <center>
      <h3 class="big-title text-center" >
        {{ title }}
      <slot></slot>
      </h3>
    </center>
      <br/>
      <br/>
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
          class="login-field"
          
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
          class="login-field"
  
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-button
          type="submit"
          class="btn-warning"
          pill
          >Login</b-button
        >
        <br/><br/>
        <div class="mt-2">
          Do not have an account yet?
          <router-link pill to="register"> Register in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
    </div>
  </template>
  
  <script>
  import { required } from "vuelidate/lib/validators";
  export default {
    name: "Login",
    props: {
    title: {
      type: String,
      required: true
    },
    },
    data() {
      return {
        form: {
          username: "",
          password: "",
          submitError: undefined
        }
      };
    },
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },
      async Login() {
        try {
          
          const response = await this.axios.post(
            // "https://test-for-3-2.herokuapp.com/user/Login",
            this.$root.store.server_domain +"/Login",
            // "http://132.72.65.211:80/Login",
            // "http://132.73.84.100:80/Login",
  
            {
              username: this.form.username,
              password: this.form.password
            },
            { withCredentials: true }
          );
          // console.log(response);
          // this.$root.loggedIn = true;
          // console.log(this.$root.store.login);
          this.$root.store.login(this.form.username);
          this.$router.push("/");
          window.location.reload();
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      },
      onLogin() {
        // console.log("login method called");
        this.form.submitError = undefined;
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        // console.log("login method go");
  
        this.Login();
      }
    }
  };
  </script>
  
  
  
  <style lang="scss" scoped>
  .container {
    max-width: 550px;
    border-radius: 25px;
    max-width: 500px;
  }
  
  .big-title{
    font-family: Georgia, serif;
    color:#dca52fed; 
    text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
    font-size: 70px;
  }
  .login-field {
      color: black;
      font-family: "Comic Sans MS", cursive, sans-serif;
      font-size: 25px;
      letter-spacing: 0.4px;
      word-spacing: -0.4px;
      color: #000000;
      font-weight: 700;
      text-decoration: none solid rgb(68, 68, 68);
      font-style: normal;
      font-variant: normal;
      text-transform: none;
  }
  
  .btn-warning{
    width: 37%;
    font-family: Georgia, serif;
    font-size: 30px;
    background-color: #cfa343;
    border-color: #cfa343;
    font-weight: bold;
    color: #080807;
    margin-left: 145px;
    border-radius: '20%';
  }
  
  .btn-warning:hover {
    background-color: #cfa343b5;
    color: white;
  }
  </style>
  
