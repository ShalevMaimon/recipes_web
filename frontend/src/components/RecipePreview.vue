<template>
  <div>
   <b-card 
     pill
     class="recipePreviewDetails" 
     tag="article"
     style="max-width: 23rem;">
     <router-link :to="getRouterLink()" style="color: rgba(231, 193, 67, 0.684);" class="recipe-preview">  <img :src="recipe.image" :alt="recipe.title" class="image-grow" style="width: 100%;" @click.stop /></router-link>
     <b-card-title style="font-size:28px; color: rgba(231, 193, 67, 0.684); font-weight: bold; font-family: italic;" class="text-center"><b>{{recipe_title}}</b></b-card-title>
     <b-card-text class="recipePreviewDetailsText">
       <b-list-group >
         <dt style="color: rgba(255, 255, 255, 0.955)" v-if="is_family">This dish usually prepared by {{ recipe.owner }}.<br></dt>
         <dt style="color: rgba(255, 255, 255, 0.955)" v-if="is_family">Traditionally, the dish is prepared on {{ recipe.when_used }}.<br></dt>
         <dt style="color: rgba(255, 255, 255, 0.955)" v-if="is_family">ingredients: {{ recipe.ingredients }}.<br></dt>
         <dt style="color: rgba(255, 255, 255, 0.955)" v-if="is_family">analyzed instructions: {{ recipe.analyzedInstructions }}</dt>

         <dt v-if="!is_family"><img src="../assets/clock.png" style="width: 30px"/>     {{ recipe.readyInMinutes }} minutes to prepare</dt>
         <dt v-if="!is_family">{{ recipe.aggregateLikes }} <img src="../assets/like.png" style="width: 22px"/> this recipe</dt>
         <dt v-if="!is_family && recipe.vegan"><img src="../assets/vegan.png" style="width: 30px"/>   Vegan</dt>
         <dt v-if="!is_family && recipe.vegetarian"><img src="../assets/vegetarian.png" style="width: 30px"/> Vegeterian</dt>
         <dt v-if="!is_family && recipe.glutenFree"><img src="../assets/gluten-free.png" style="width: 25px"/> Gluten Free</dt>
         <dt v-if="!is_family &&!is_my && recipe.favorite"><img src="../assets/love.png" style="width: 30px"/>  Favorite Recipe</dt>
         <button v-if="$root.store.username && !is_family && !is_my && !recipe.favorite"  v-on:click="AddToFavorites" style="color: white; background: transparent; border: none; width: 250px; margin-left: 30px;"><img src="../assets/no_love.png" style="width: 30px" />No in Favorite</button>
         <dt v-if="!is_family && !is_my  && recipe.seen"><img src="../assets/check.png" style="width: 25px"/>   Viewed Recipe</dt>
       </b-list-group>
     </b-card-text>
   </b-card>
   <br>
  </div>
</template>

 
 <script>
 export default {
 
   data() {
     return {
        API_route: false,
        is_family: false,
        is_my: false,
        recipe_title: ""
       //  split_route: ""
     };
   },
   props: {
     recipe: {
       type: Object,
       required: true
     },
     title: {
       type: String,
       required: true
     },
     route_name:{
       type: String,
       required: true
     },
   },
   //
 mounted() {
  this.updateRecipes()
  this.recipe_title= this.recipe.title;
  console.log(this.$route.path)
  },
  methods: {
     async updateRecipes() {
        try {
          if(this.$route.path==="/myfamilyrecipes"){
              console.log("family")
              this.is_family = true;
          }
          if(this.$route.path==="/myrecipes"){
              console.log("my")
              this.is_my = true;
          }
        }catch (error) {
          console.log(error);
       }
     },

    getRouterLink() {
      if(this.route_name === "/users/getfamilyrecipes"){
        return{name:"myfamilyrecipes"};
      }
      return {
        name: 'recipe',
        params: {
          recipe_id: this.route_name === '/recipes/search' ? this.recipe.id : this.recipe.recipe_id,
          route_name: this.route_name
        }
      };
    }, 
    async AddToFavorites(){
      const response = await this.axios.post(
        // "https://test-for-3-2.herokuapp.com/user/Register",
        this.$root.store.server_domain + "/users/addtofavorites",
        {
          recipe_id: this.route_name === '/recipes/search' ? this.recipe.id : this.recipe.recipe_id
        },
        {withCredentials: true}
      );
      window.location.reload();
   }
   }
   
 };
 </script>
 
 <style scoped>
 .recipePreviewDetails{
   background-color: #00010369;
 }
 .recipePreviewDetailsText{
   color: rgba(255, 255, 255, 0.955)     
 }

 .image-grow {
transition: transform 0.2s ease;
}

.image-grow:hover {
transform: scale(1.2);
}

 </style>