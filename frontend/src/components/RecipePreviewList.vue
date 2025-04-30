<template>
  <b-container>
    <center>
    <h3 class="big-title text-center" >
        {{ title }}
      <slot></slot>
    </h3>
    </center>
   <center>
    <h1 v-if="no_recipe || no_recipe_search">
      <br/>
      <br/>
      There Are No {{ title }}</h1>
    </center>
    <center>
    <b-col v-if="!no_recipe_search">
      <b-col v-for="r in recipes" :key="r.recipe_id">
        <RecipePreview class="recipePreview" :recipe="r" :title="title" :route_name="route_name" style="margin-left:10px;"/>
      </b-col>
    </b-col>
     </center>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    route_name:{
      type: String,
      required: true    
    }
  },
  data() {
    return {
      recipes: [],
      no_recipe: false,
      no_recipe_search: false,
      reloadKey: 0
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        this.no_recipe_search = false;
        const response = await this.axios.get(
        this.$root.store.server_domain + this.route_name
        );
        if (this.route_name.startsWith('/recipes/search')) {
          
          this.route_name='/recipes/search'
        }
        if(response.data.length === 0) {
          this.no_recipe = true;
        }
        if(response.data == "No matching search results were found") {
          this.no_recipe_search = true;
        }
        else{
          const recipes = response.data;
          this.recipes = [];
          this.recipes.push(...recipes);
        }    
      } catch (error) {
        console.log(error);
      }
    },
    async updateRandomRecipes() {
      try {
        this.no_recipe_search = false;
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
        );
        if(response.data.length === 0) {
          this.no_recipe = true;
        }a
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 80px;
}

.big-title{
  font-family: Georgia, serif;
  color:#dca52fed; 
  text-shadow: -1px 0 black, 0 3px black, 1px 0 black, 0 -1px black;
  font-size: 60px;
}

</style>
