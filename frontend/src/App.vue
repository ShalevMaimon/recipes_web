<template>
  <div id="app">
    <NavBar/>
    
    <router-view />
   
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
// import NavBar from ".\components\NavBar.vue"
export default {
    name: "App",
      components:{
      NavBar
    },
    methods: {
        Logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");
            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });

        },
        changeRoute(e) {
          this.$router.push("/users/" + e.target.value);
        }
    },


    components: { NavBar }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
#app::after{
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
