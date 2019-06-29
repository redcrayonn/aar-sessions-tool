import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cavUsers: null
  },
  mutations: {
    setCavUsers(state, users) {
      state.cavUsers = users;
    }
  },
  actions: {
    GetActiveUsers({ commit, state }) {
      return new Promise((resolve, reject) => {

        console.log(state.cavUsers);
        axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBhMjM0N2I0MWNlNDI2YTMxMGMwNWI0NzUzYWZkMWZlZGFmOWJmYmExMzMxZTExOWNhZGMxNzQ1MDViOWU3N2IwOGRmNzhkOTkwMzVmYzEwIn0.eyJhdWQiOiIzIiwianRpIjoiMGEyMzQ3YjQxY2U0MjZhMzEwYzA1YjQ3NTNhZmQxZmVkYWY5YmZiYTEzMzFlMTE5Y2FkYzE3NDUwNWI5ZTc3YjA4ZGY3OGQ5OTAzNWZjMTAiLCJpYXQiOjE1NjE1NzczMDgsIm5iZiI6MTU2MTU3NzMwOCwiZXhwIjoxNTkzMTk5NzA4LCJzdWIiOiIzIiwic2NvcGVzIjpbInVzZXJzIiwibWlscGFjcyIsInJlY29yZHMiXX0.KnvKPkRkxbuSiSrqkW0B_ltcdwJG9o_2cndG4KkfrGYo-QevlSTUEopKy57yQWgVjEPGjpZrxh5Hcnw76YFp3mcZPHNHbRYukAlrFs1LTCt9tntVDLGLAeGLrz9gkM1q1MdQEyaJJ33WYXij8py_qEop9hIoiJDzEpjrEhu1hm350e1YjzE3Db2MQvgKvZuVKc9DK08y_FRAbmRB3ab01hu13Tjbu8oqhaucDxBJk4WlGRjghKAmptNfuomFno2J5fe1EcgmDLV5euxMwHXjeU4bxj8kxAFVdz7U6RqptaBl-DZ9XQehQYY1RKs9Uvg6WOMdSHilL2Oe33X7hXlfDH8idAPNd67QkVTDVwmHYHHauV68M1BkftXqif1rSgv8jYtSptGx3P5pYhUdRx7lFwGzLf2FaAm2E6cgBIyn4ZwfaqOhRU3glg9ri1qqkKxSXLOIFXSs-iuKFYFR58CrfqQ0UxnrdC6Z0o0ecjbHaWwNxurddLfUXgkoZVwUSLiAx2PqgPkxuPaVcmXBytNRl-c9jzThHQitwoxFwRII14XkZeoORzYhfnpiXal2LheoGNk41HS13e89L-rZyUvr7eL_w7EejKtwimn9wOz4lO2GP7Qt3rPeoJc2lSAsKYM9yF6NWt4yftP_r_CLeJ11xFIBE34zgH8gv937XlNeapM'; // for all requests
        axios
          .get(`https://api.7cav.us/v1/users/active`)
          .then(response => {
            commit('setCavUsers', response.data.data.users);
            resolve();
          }
          )
      })
    }
  }
})
