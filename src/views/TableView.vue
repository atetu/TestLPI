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
    const getData = async()=> {
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
        this.personsDict[person.id] = person;
      }
      let lastId = this.personsDict[Object.keys(this.personsDict)[Object.keys(this.personsDict).length - 1]].id
      store.state.lastId = lastId

      store.state.personsDict = this.personsDict
    } 
    getData()
  },
  methods : {
    handleChange(value) {
      this.personsDict = value
      this.$forceUpdate()
    }
  }
};
</script>
