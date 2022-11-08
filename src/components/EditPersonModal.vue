<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <h2 class="required" v-if="required">Please fill in all the fields</h2>
        <div class="field">
          <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" v-model="firstName" >
            </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" v-model="lastName">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" v-model="email">
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" v-model="country">
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" v-model="city">
          </div>
        </div>
      </div>
      <button class="button is-primary" v-on:click="submitPerson()">Submit</button>
  </div>
</template>


<script>
export default {
  name: "EditPersonModal",
  props : {
    sentPerson: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      required: false,
    }
  },
  created() {
    this.firstName = this.sentPerson.firstname
    this.lastName = this.sentPerson.lastname
    this.email = this.sentPerson.email
    this.city = this.sentPerson.address.city
    this.country = this.sentPerson.address.country
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
      var person = {
        "id": this.sentPerson.id,
        "firstname": this.firstName, 
        "lastname": this.lastName, 
        "email": this.email, 
        "address": {
          "city": this.city, 
          "country": this.country
        }
      }
      this.$emit('personEdit', person)
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