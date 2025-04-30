<template>
    <div class="container">
      <br/>
      <br/>
      <br/>
      <br/>
      <RecipePreviewList route_name="/users/getfamilyrecipes" title="Family Recipes" class="FamilyRecipes center" />
      <br/>
      <br/>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "familyRecipes",
  components: {
    RecipePreviewList
  }
};
</script>

<style>

</style>