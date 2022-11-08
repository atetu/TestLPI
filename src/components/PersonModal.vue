<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <h2 class="required" v-if="required">Please fill in all the fields</h2>
        <div class="field">
          <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. Alex" v-model="firstName">
            </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Smith" v-model="lastName">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com" v-model="email">
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. United Kingdom" v-model="country">
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. London" v-model="city">
          </div>
        </div>
      </div>
      <button class="button is-primary" v-on:click="submitPerson()">Submit</button>
  </div>
</template>


<script>
import store from "../store/index.js"

export default {
  name: "PersonModal",
  props : {
    sentPerson: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      country: "",
      required: false,
    }
  },
  methods: {
    submitPerson: function() {
      if (this.firstName === "" || this.lastName === "" || this.email === "" || this.city === "" || this.country === "") {
        this.required = true
      }
      else {
        this.registerPerson()
      }
    },
    registerPerson: function() {
      store.state.lastId += 1
      let person = {
        "id": store.state.lastId,
        "firstname": this.firstName, 
        "lastname": this.lastName, 
        "email": this.email, 
        "address": {
          "city": this.city, 
          "country": this.country
        }
      }
      this.$emit('personAdd', person)
    }
  }
};
</script>

<style scoped lang="scss">
  .required {
    color: red;
  };
  .label{
    color:  white;
  }
</style>