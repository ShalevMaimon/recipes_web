<template>
  <center>
    <br/>
    <br/>
  <div class="recipe-footer">
    <h4 id="big-title" :title="recipe.title" class="recipe-title">
      {{ recipe.title }}
    </h4>
    <br/>
    <div pill class="recipe-body">
        <!-- <img v-if="image_load" :src="recipe.image" class="recipe-image" /> -->
        <img :src="recipe.image" style="height:500px; width:600px; border-radius: 30px;" class="recipe-image" />
    </div>
    <br/>
    <ul class="recipe-overview">
      <b-list-group >
        <dt><img src="../assets/clock.png" style="width: 30px"/> {{ recipe.readyInMinutes }} minutes to prepare</dt>
        <dt v-if="recipe.servings"><img src="../assets/servings.png" style="width: 30px"/> {{ recipe.servings }} servings</dt>
        <dt>{{ recipe.aggregateLikes }} <img src="../assets/like.png" style="width: 30px"/> this recipe</dt>
        <dt v-if="recipe.vegan"><img src="../assets/vegan.png" style="width: 30px"/>   Vegan</dt>
        <dt v-if="recipe.vegetarian"><img src="../assets/vegetarian.png" style="width: 30px"/> Vegeterian</dt>
        <dt v-if="recipe.glutenFree"><img src="../assets/gluten-free.png" style="width: 30px"/> Gluten Free</dt>
        <dt v-if="$root.store.username && recipe.favorite"><img src="../assets/love.png" style="width: 30px"/>  Favorite Recipe</dt>
        <dt v-if="$root.store.username && recipe.seen"><img src="../assets/check.png" style="width: 25px"/>   Viewed Recipe</dt>
        <br/>
       <center>
           <b-button pill v-if="this.API_route && $root.store.username && !recipe.favorite" id="favoritesButton" size="sm" @click="AddToFavorites" class="btn-warning w-15 h-20"> add to favorites</b-button>
        </center>
      </b-list-group >
      <!-- extendedIngredients -->
       <br/>
      <h5 id="IngredientsTitle">Ingredients</h5> <br/>
      <b-col>
      <center>
      <div v-if="API_route"> 
        <div id="ingredients" v-for="ing in recipe.extendedIngredients" :key="ing.name">
          {{ing.amount }} {{ing.name }}
        </div>
      </div>
      <div id="ingredients" v-if="!API_route" > 
        <div id="ingredients" v-for="i in this.ingredients" :key="i">
          {{i }}
        </div>
      </div>
      </center>
      <br/>
      <div id="instructions" > <h5 id="InstructionsTitle">Instructions</h5> <br/>
         {{ instructions }}</div>
         </b-col>
    </ul>
</div>
</center>
</template>

<script>
// import RecipePreview from "./RecipePreview.vue";
export default {
name: "Recipeview",
data() {
  return {
    recipe: {},
    instructions:"",
    recipe_id:"",
    API_route: false,
    ingredients:"",
  };
},
mounted() {
  this.updateRecipes();
},
methods: {
  async updateRecipes() {
    try {
      let split_route = (((this.$route.path).split("/")[2]).split("%2F"))[2]
      let split_recipe_id = ((this.$route.path).split("/"))[4]
      if( split_route == "getThreeLast" || split_route =="random" || split_route =="getfavorites" || split_route =="search"){
        this.API_route = true;
        const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/expandeRecipeData/" + split_recipe_id)
        let array_steps = response.data.analyzedInstructions
        for (const analyze of array_steps){
          for(const ste of analyze.steps){
            this.instructions = this.instructions + ste.step
          }
        }
        this.recipe= response.data;
        this.recipe_id= response.data.recipe_id;    
      }
      else if(split_route == "getpersonalrecipe"){
        const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/expandepersonalRecipeData/" + split_recipe_id)
        this.recipe= response.data;
        this.instructions = response.data.analyzedInstructions;
        this.recipe_id= response.data.recipe_id;
        this.ingredients=response.data.extendedIngredients.split(",").map(item => item.trim());
      }
   
    } catch (error) {
      console.log(error);
    }
  },
  async AddToFavorites(){
     const response = await this.axios.post(
        // "https://test-for-3-2.herokuapp.com/user/Register",
        this.$root.store.server_domain + "/users/addtofavorites",
        {
          recipe_id: this.recipe_id
        },
        { withCredentials: true }
      );
      window.location.reload();

  }
}
};
</script>

<style scoped>
.favoritesButton{
background-color:  #F19CBB;
color: #0ad8d8;
}
.recipe-title{
  color: #ffffff;
  font-weight: bolder;
  font-size: 32px;

}
.recipe-overview{
  font-size: 20px;
  color: #ffffff;
}
#InstructionsTitle{
  font-family: Georgia, serif;
  color:#dca52fed; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 55px;
}
#IngredientsTitle{
  font-family: Georgia, serif;
  color:#dca52fed; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 55px;
}
#ingredients{
  font-size: 25px;
  color: #ffffff;
  max-width: 800px; 
  width:800px; 
}
#instructions{
  font-size: 25px;
  color: #ffffff;
  max-width: 800px; 
  width:800px; 
}
.btn-warning{
  width: 20%;
  font-family: Georgia, serif;
  font-size: 20px;
  background-color: #cfa343c2;
  border-color: #cfa343;
  font-weight: bold;
  color: #080807;
  margin-left: 12px;
  border-radius: '20%';
}

.btn-warning:hover {
  background-color: #cfa343b5;
  color: white;
}

.recipe-footer{
  background: #0000004f;
  max-width: 1000px; 
  width:1000px; 
  padding: 1em;
  border-radius: 30px;
}

#big-title{
  font-family: Georgia, serif;
  color:#dca52fed; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 70px;
}
</style>
