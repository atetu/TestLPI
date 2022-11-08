import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedData: false,
    personsDictStore: {},
    lastId : 0
  },
  getters: {
    // fetchedData(state) {
    //   return state.fetchedData
    // }
  },
  mutations: {
    // async getData () {
    //   if (localStorage.getItem('reloaded') === null || localStorage.getItem('reloaded') === false){
    //   try {
    //     const res = await fetch(
    //       "https://fakerapi.it/api/v1/persons?_locale=fr_FR"
    //     );

    //     if (!res.ok) {
    //       const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //       throw new Error(message);
    //     }

    //     const data = await res.json();

    //     const result = {
    //       status: res.status + "-" + res.statusText,
    //       headers: {
    //         "Content-Type": res.headers.get("Content-Type"),
    //         "Content-Length": res.headers.get("Content-Length"),
    //       },
    //       length: res.headers.get("Content-Length"),
    //       data: data,
    //     };
    //     this.personsDict = {}
  
    //     for (var i = 0, person; i < result.data.data.length; i++) {
    //       person = result.data.data[i];
    //       this.personsDict[person.email] = person;
    //     }
    //     console.log(personsDict);
    //   } catch (err) {
    //     this.getResult = err.message;
    //   }
    //   }
    // },
    addPerson (person) {
      personsDict[person.email] = person
    },
    deletePerson (person) {
      delete(personsDict[person.email])
    }
  },
  actions: {},
  modules: {},
});
