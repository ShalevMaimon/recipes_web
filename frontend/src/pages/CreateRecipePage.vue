<template>
    <div>  
      <b-modal id="modal-1" ref="my-modal" style="color:blue" title="Create New Recipe" hide-footer>
      <b-form @submit.prevent="onCreate" @reset.prevent="onResetCreate" >
          <b-form-group>
          <b-form-input
              id="input-1"
              v-model="form.recipename"
              type="text"
              placeholder="Enter recipe name"
              required
          ></b-form-input>
          </b-form-group> 
  
          <b-form-group>
          <b-form-input
              id="input-2"
              v-model="form.servings"
              type="number"
              placeholder="Enter servings number"
              required
          ></b-form-input>
          </b-form-group> 
  
          <b-form-group>
          <b-form-input
              id="input-3"
              v-model="form.readyInMinutes"
              type="number"
              placeholder="Enter preparation time in minutes "
              required
          ></b-form-input>
          </b-form-group> 
  
          <b-form-group>
          <b-form-input
              id="input-4"
              v-model="form.image"
              type="url"
              placeholder="Enter the URL image of the recipe "
              required
          ></b-form-input>
          </b-form-group>
  
          <b-form @submit.prevent="add_ingredient">
            <b-row>
            <b-col>
            <p><b>ingredients that you already added:</b>
            <br/>
            {{this.display_ingredients}}
            </p>
            </b-col>
            <b-col>
            <b-form-group>
            <b-form-input v-model="form2.ingredient" style="width:220px;" type="text"  placeholder="Enter ingredient" required></b-form-input>
            </b-form-group>
  
            <b-form-group>
            <b-form-input v-model="form2.amount" style="width:220px;" type="number"  placeholder="Enter amount" required ></b-form-input>
            </b-form-group>
  
            <b-form-group>
            <b-button style="background-color: #cfa343; border-color: #cfa343;" class="btn-info" pill type="submit" @click="add_ingredient">ADD</b-button>
  
            </b-form-group>
            </b-col>
            </b-row>
          </b-form>
  
          <b-form-group>
            <b-form-textarea
            id="textarea"
            v-model="form.insrtaction"
            placeholder="Enter insrtaction of recipe..."
            rows="4"
            required
            ></b-form-textarea>
          </b-form-group>
      <b-form-checkbox v-model="form.checked_gluten" name="check-button1" switch>
          <h1 style="font-size: 22px;">gluten free </h1>
      </b-form-checkbox>       
      <b-form-checkbox v-model="form.checked_vegan" name="check-button2" switch>
          <h1 style="font-size: 22px;">vegan </h1> 
      </b-form-checkbox>
      <b-form-checkbox v-model="form.checked_vegetarian" name="check-button3" switch>
          <h1 style="font-size: 22px;">vegetarian </h1> 
      </b-form-checkbox>   
      <br>              
      <b-row>
  
        <b-col lg="3" class="pb-2"><b-button pill class="btn-warning" type="reset" style="color: white;">Reset</b-button></b-col>
        <b-col lg="3" class="pb-2"><b-button pill type="submit" style="color: white;" class="btn-primary">Create</b-button></b-col>
                
      </b-row>
      <!-- <b-button @click="Register" -->
      </b-form>            
      </b-modal>    
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          recipename: '',
          servings: '',
          readyInMinutes:'',
          image:'',
          checked_gluten: false,
          checked_vegetarian: false,
          checked_vegan: false,
          insrtaction:'',
  
          },
        form2: {
          ingredient:'',
          amount:''
        },
          display_ingredients:""
        }
      },
    mounted() {
        this.onResetCreate();
    },
    methods: {
      async Create() {
        try {
          // console.log("chack")
          const user_id = await this.axios.get(
            this.$root.store.server_domain + "/users/userid",
            { withCredentials: true }
          );

          await this.axios.post(
            // "https://test-for-3-2.herokuapp.com/user/Register",
            this.$root.store.server_domain + "/users/addpersonalrecipe",
          {
            user_id: user_id.data,
            image: this.form.image,
            title: this.form.recipename,
            readyInMinutes: this.form.readyInMinutes ,
            glutenFree: this.form.checked_gluten & 1,
            aggregateLikes: 0,
            analyzedInstructions: this.form.insrtaction,
            servings: this.form.servings,
            vegan: this.form.checked_vegan & 1,
            vegetarian: this.form.checked_vegetarian & 1,
            extendedIngredients: this.display_ingredients            
          },
          { withCredentials: true }
          );
          // console.log(response)
  
          await this.onResetCreate();
          this.$refs['my-modal'].hide()
          // moves to login rout right after registration 
          // console.log(response);
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      },
      onCreate(){   
        if(this.display_ingredients.length > 0){
          this.Create()
          this.$root.toast("Create", "Recipes created successfully", "success");
        }     
        else{
          this.$root.toast("error", "there is no ingredients", "error");
        }
        onResetCreate()
        window.location.reload();
  
      },
      async onResetCreate(){
       
        this.form={
          recipename: '',
          servings: '',
          readyInMinutes:'',
          image:'',
          checked_gluten: false,
          checked_vegetarian: false,
          checked_vegan: false,
          insrtaction:'',
  
        },
        this.form2={
          ingredient:'',
          amount:''
        }
        this.display_ingredients=""
        
      },
      add_ingredient(){
        if(this.form2.ingredient !== "" && this.form2.amount !=="")
        {      
          this.display_ingredients = this.display_ingredients + this.form2.amount+" "+this.form2.ingredient + ", "
          this.reset_ingredient();
        }
      },
      reset_ingredient(){
        this.form2={
          ingredient:'',
          amount:''
        }
      }    
    }
  
  }
  </script>
  
<style>

.title1{
  color: #cfa343;
  font-size: 25px;
  margin-left: 50px;
}

.btn-warning{
  background-color: #5D6166;
  border-color: #5D6166;
  font-weight: bold;
  color: #ffffff;
}

.btn-warning:hover {
  background-color: #cfa343b5;
  color: white;
}

.btn-primary{
  background-color: #cfa343;
  border-color: #cfa343;
  width:350%;
  font-weight: bold;
  color: #080807;
}

.btn-primary:hover{
  background-color: #cfa34399;
  border-color: #cfa343;
  font-weight: bold;
  color: #ffffff;
}

.btn-info{
  background-color: #cfa343;
  border-color: #cfa343;
  font-weight: bold;
  color: #ffffff;
  margin-left: 150px;
} 

.btn-info:hover{
  background-color: #cfa34399;
  border-color: #cfa343;
  font-weight: bold;
  color: #ffffff;
}

</style>
