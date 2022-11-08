<template v-if="data">
    <PersonsTable @personsUpdate="handleChange" :personsDict="this.personsDict">{{this.personsDict}}</PersonsTable>
</template>

<script>
import PersonsTable from "@/components/PersonsTable.vue";
import store from "../store/index.js"

export default {
  name: "TableView",
  components: {
    PersonsTable,
  },
  data() {
    return {
      personsDict: {},
      data: false
    };
  },
  async created() {
    // console.log(store.state.fetchedData)
    const getData = async()=> {
      try {
        console.log("beforecreate")
        const res = await fetch(
          "https://fakerapi.it/api/v1/persons?_locale=fr_FR"
        );

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          length: res.headers.get("Content-Length"),
          data: data,
        };
        this.personsDict = {}
  
        for (var i = 0, person; i < result.data.data.length; i++) {
          person = result.data.data[i];
          this.personsDict[person.email] = person;
        }
        let lastId = this.personsDict[Object.keys(this.personsDict)[Object.keys(this.personsDict).length - 1]].id
        store.state.lastId = lastId

        store.state.personsDict = this.personsDict
        data = true
      } catch (err) {
        this.getResult = err.message;
      }
    }

      getData()
    //   store.state.fetchedData = true
    // }
    // else {
    //   console.log("true")
    //   this.personsDict = store.state.personsDict
    //   console.log(this.personsDict)
    //   }
    },
     updated() {
    console.log('updated!')
  },
    watch: {
      personsDict() {
      console.log("update persons")
      // `If` is only here for testing purposes
      // this.$emit('personsUpdate', this.personsDict);
    },
  },
    methods : {
      handleChange(value) {
        this.personsDict = value
        console.log("event")
        console.log(this.personsDict)
        this.$forceUpdate()
      }
    }
  // methods: {
  //   deletePerson:function (person){
  //     console.log("delete")
  //     delete(this.personsDict[person.email])
  //     store.state.personsDict = this.personsDict
  //     // console.log(this.personsDict)
  //     // localStorage.setItem('reloaded', true)
  //     window.location.reload();
  //   }
  // }
};
</script>
