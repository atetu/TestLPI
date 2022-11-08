<template>
  <div class="table">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in this.personsDict">
          <tr :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.firstname}}</td>
            <td>{{item.lastname}}</td>
            <td>{{item.email}}</td>
            <td>{{item.address.city}}</td>
            <td>{{item.address.country}}</td>
            <button class="button is-primary" @click="setEditPerson(item)">Edit</button>
            <EditPersonModal v-if="showEditModal" @personEdit="editPerson" :sentPerson="editPersonItem"></EditPersonModal>
            <button class="button is-primary" v-on:click="deletePerson(item)">Delete</button>
          </tr>
          </template>
        </tbody>
      </table>
    <button class="button is-primary" @click="showModal=true">Add</button>
    <PersonModal v-if="showModal" @personAdd="addPerson"/>
  </div>
</template>

<script>
import PersonModal from './PersonModal.vue';
import EditPersonModal from './EditPersonModal.vue';

export default {
  components: { PersonModal, EditPersonModal },
  name: "PersonsTable",
  props: {
    personsDict: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      personsDict: {},
      showModal: false,
      showEditModal: false,
      editPersonItem: {}
    }
  },
  created() {
    this.personsDict = this.persons;
  },
  methods: {
    deletePerson:function (person){
      delete(this.personsDict[person.id])
      this.$emit('personsUpdate', this.personsDict)
    },
    addPerson:function (person){
      this.personsDict[person.id] = person
      this.$emit('personsUpdate', this.personsDict)
      this.showModal = false
    },
    setEditPerson:function (person){
      this.showEditModal = true
      this.editPersonItem = person
    },
    editPerson:function (person){
      console.log(person.id)
      this.personsDict[person.id] = person
      this.$emit('personsUpdate', this.personsDict)
      this.showEditModal = false
    },
  }
};
</script>

