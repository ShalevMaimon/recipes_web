<template>
    <div class="container">
      <br/>
      <br/>
      <br/>
      <br/>
      <RecipePreviewList route_name="/users/getpersonalrecipe" title="My Recipes" class="MyRecipes center" />
      <br/>
      <br/>
   
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "MyRecipes",
  components: {
    RecipePreviewList
  }
};
</script>

<style>

</style>