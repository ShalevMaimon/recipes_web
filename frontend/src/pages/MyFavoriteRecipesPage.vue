<template>
    <div class="container">
      <br/>
      <br/>
      <br/>
      <br/>
      <RecipePreviewList route_name="/users/getfavorites" title="Favorite Recipes" class="FavoriteRecipes center" />
      <br/>
      <br/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "favorites",
  components: {
    RecipePreviewList
  }
};
</script>

<style>

</style>