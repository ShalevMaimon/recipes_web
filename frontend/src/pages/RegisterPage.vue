<template>
  <div class="container">
    <br/>
    <br/>
    <h1 class="big-title text-center">Register</h1>
    <br/>
    <br/>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      
      <!-- user name -->
      
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
        class="register-field"

      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must be alphabetical
        </b-form-invalid-feedback>
      </b-form-group>
    <!-- firstName -->
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="first Name:"
        label-for="firstName"
        class="register-field"
        
      >
      <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          firstName is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          firstName must be alphabetical
        </b-form-invalid-feedback>
      </b-form-group>   

      <!-- lastNam -->
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="last Name:"
        label-for="lastName"
        class="register-field"

      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          lastName is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          lastName must be alphabetical
        </b-form-invalid-feedback>
      </b-form-group>  

      <!-- country -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
        class="register-field"

      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>
    <!-- email -->

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="email:"
        label-for="email"
        class="register-field"

      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.validEmail">
          'Valid email required.'
        </b-form-invalid-feedback>
      </b-form-group>      


      <!-- Password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
        class="register-field"

      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
         
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required || !$v.form.password.length || !$v.form.password.specialChar || !$v.form.password.digit"
        >
          Your password should be <strong style="color:blue">strong</strong>. <br />
          For that, your password should have length between 5-10 characters long and least one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- confirmedPassword -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
        class="register-field"

      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button class="btn-primary" type="reset" pill >Reset</b-button>
      <b-button
        pill type="submit"
        class="btn-warning"
        >Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      pill variant="warning"
      dismissible
      show>
      Register failed: {{ form.submitError }}
    </b-alert>

  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      firstName: {
        required,
        alpha
      },
      lastName:{
        required,
        alpha
      },
      email:{
        required,
        email,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        specialChar: (p) => p && /[^A-Za-z0-9]/.test(p), 
        digit: (p) => p && /\d/.test(p), 
        

      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/Register",
          {
            username: this.form.username,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            confirmation_password: this.form.confirmation_password,
            email: this.form.email,
          }
        );
        // moves to login rout right after registration 
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.container {

  max-width: 550px;
  // background-color: #EFEFEF;
  border-radius: 25px;
  // border-style: solid;
  // border-color: darkgrey;
  // padding: 20px;
  max-width: 500px;
}

.big-title{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 65px;
  color:#dca52fed;
  font-weight: bolder;
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
.btn-primary{
  width:20%;
  padding: 15px 20px;
  font-weight: bold;
  color: #080807;
}
.register-field {
  color: black;
  // font-weight: bolder;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 18px;
    letter-spacing: 0.4px;
    word-spacing: -0.4px;
    color: #000000;
    font-weight: 700;
    text-decoration: none solid rgb(68, 68, 68);
    font-style: normal;
    font-variant: normal;
    text-transform: none;
}

.btn-warning:hover {
  background-color: #cfa343b5;
  color: white;
}
</style>