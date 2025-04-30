<template>
  <div class="container">
    <br><div id="welcome" justify="center"><center><img src="@/assets/welcome2.png" width ="50%" height = "0%" /></center></div>
    <b-row>
      <b-col></b-col> <b-col></b-col>
      <b-col cols="5" class="RandomRecipesCol">
        <RecipePreviewList route_name="/recipes/random" title="Explore this recipes" class="RandomRecipes center" />
        <b-button tag="button" pill @click="new_random_recipes" class="buttonwelc"> Click for new 3 recipes!</b-button>
      </b-col>
      <b-col></b-col>
      <b-col cols="4">
        <RecipePreviewList v-if="$root.store.username" route_name="/users/getThreeLast" title="Last watched recipes" class="LastViewedRecipes center" ></RecipePreviewList>
        <!-- <RecipePreviewList v-if="!$root.store.username" title="Log in and Register" class="RandomRecipes center" /> -->
        <!-- <br><b-button v-if="!$root.store.username" to="/login" tag="button" class="buttonwelc" pill>Click to log in!</b-button>
        <br><br><b-button v-if="!$root.store.username" to="/Register" tag="button" class="buttonwelc" pill>Click to register!</b-button> -->
        <LogIn v-if="!$root.store.username" width="200px" title="Log In" class="Log In center" />
      </b-col>
      <b-col></b-col><b-col></b-col><b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LogIn from "../components/LogIn.vue";


export default {
  components: {
    RecipePreviewList,
    LogIn
  },
   methods: {
    new_random_recipes(){
      // this.$children.updateRandomRecipes()
      window.location.reload();

    }
    }
};
</script>

<style lang="scss" scoped>

.container {
  border-radius: 27px;
  max-width: 1900px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}

.title{
  color:#cfa343;
  font-weight: bolder;

}
.big-title{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 48px;
  color:#cfa343;
}

.buttonwelc{
  width:40%;
  font-family: Georgia, serif;
  font-size: 23px;
  padding: 14px 14px;
  background-color: #cfa343;
  border-color: #cfa343;
  font-weight: bold;
  color: #080807;
  margin-left: 235px;
  border-radius: '50%';
}

.buttonwelc:hover {
  background-color: #cfa343b5;
  color: white;
}

.log{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 48px;
  color:#cfa343;
  font-weight: bolder;
}

</style>
