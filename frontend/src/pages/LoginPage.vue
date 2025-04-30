<template>
<div class="container">
  <b-row>
      <b-col></b-col>
      <b-col cols="6"> 
        <LogIn title="Log In" class="Log In center" />

      </b-col>
      <b-col></b-col>
  </b-row>

</div>
</template>

<script>
import LogIn from "../components/LogIn.vue";

export default {
name: "login",
components: {
    LogIn
}
};
</script>

<style>
.log{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 65px;
  color:#dca52fed;
  font-weight: bolder;
}
</style>