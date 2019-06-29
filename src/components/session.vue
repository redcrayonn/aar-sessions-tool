<template>
    <span>
        <a v-if="dataFound" :href="'https://7cav.us/rosters/profile?uniqueid=' + cavUser.milpac_id">
            {{cavUser.rank_shorthand}}.{{cavUser.username}}
        </a>
        <span v-if="!dataFound">{{session.attributes.name}}</span>
    </span>
</template>

<script>

// Get userid
// Generate milpac link
// Show milpac link

export default {
  name: 'session',
  data () {
      return {
          cavUser: null
      }
  },
  props: {
      session: null
  },
  computed: {
    nonNullItems: function() {
      if(this.cavUser !== null)
      {
        return this.cavUser;
      }
    },
    dataFound: function(){
        if(this.cavUser != null && this.cavUser.milpac_id != null && this.cavUser.username != null)
        {
            return true;
        }
        else{
            return false;
        }
    }
  },
  methods: {
      link: async function(){
        // Make sure users are loaded
        var cavUsers = this.$store.state.cavUsers;
        console.log('users in state');
        console.log(cavUsers);
        if(cavUsers === null)
        {
            console.log('not in state');
            await this.$store.dispatch('GetActiveUsers', null, {root:true});
            cavUsers = this.$store.state.cavUsers;
        }
        // Find user in cav api users.
        let bmName = this.session.attributes.name;
        this.cavUser = cavUsers.find(x => `${x.rank_shorthand}.${x.username}` === bmName);
      }
          
    //       console.log('making the call');
    //     axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBhMjM0N2I0MWNlNDI2YTMxMGMwNWI0NzUzYWZkMWZlZGFmOWJmYmExMzMxZTExOWNhZGMxNzQ1MDViOWU3N2IwOGRmNzhkOTkwMzVmYzEwIn0.eyJhdWQiOiIzIiwianRpIjoiMGEyMzQ3YjQxY2U0MjZhMzEwYzA1YjQ3NTNhZmQxZmVkYWY5YmZiYTEzMzFlMTE5Y2FkYzE3NDUwNWI5ZTc3YjA4ZGY3OGQ5OTAzNWZjMTAiLCJpYXQiOjE1NjE1NzczMDgsIm5iZiI6MTU2MTU3NzMwOCwiZXhwIjoxNTkzMTk5NzA4LCJzdWIiOiIzIiwic2NvcGVzIjpbInVzZXJzIiwibWlscGFjcyIsInJlY29yZHMiXX0.KnvKPkRkxbuSiSrqkW0B_ltcdwJG9o_2cndG4KkfrGYo-QevlSTUEopKy57yQWgVjEPGjpZrxh5Hcnw76YFp3mcZPHNHbRYukAlrFs1LTCt9tntVDLGLAeGLrz9gkM1q1MdQEyaJJ33WYXij8py_qEop9hIoiJDzEpjrEhu1hm350e1YjzE3Db2MQvgKvZuVKc9DK08y_FRAbmRB3ab01hu13Tjbu8oqhaucDxBJk4WlGRjghKAmptNfuomFno2J5fe1EcgmDLV5euxMwHXjeU4bxj8kxAFVdz7U6RqptaBl-DZ9XQehQYY1RKs9Uvg6WOMdSHilL2Oe33X7hXlfDH8idAPNd67QkVTDVwmHYHHauV68M1BkftXqif1rSgv8jYtSptGx3P5pYhUdRx7lFwGzLf2FaAm2E6cgBIyn4ZwfaqOhRU3glg9ri1qqkKxSXLOIFXSs-iuKFYFR58CrfqQ0UxnrdC6Z0o0ecjbHaWwNxurddLfUXgkoZVwUSLiAx2PqgPkxuPaVcmXBytNRl-c9jzThHQitwoxFwRII14XkZeoORzYhfnpiXal2LheoGNk41HS13e89L-rZyUvr7eL_w7EejKtwimn9wOz4lO2GP7Qt3rPeoJc2lSAsKYM9yF6NWt4yftP_r_CLeJ11xFIBE34zgH8gv937XlNeapM'; // for all requests
    //   axios
    //     .get(`https://api.7cav.us/v1/users/active`)
    //     .then(response => 
    //         {
    //             console.log('call succesful');
    //             console.log(response.data.data.users);
    //             let users = response.data.data.users;
    //             // Find user in cav api users.
    //             let bmName = this.session.attributes.name;
    //             console.log('name: ' + bmName);
    //             this.cavUser = users.find(x => `${x.rank_shorthand}.${x.username}` === bmName);

    //             console.log('found user: ' + this.cavUser);
    //         } 
    //     )
    //   },
  },
  mounted: function(){
      this.link();
  }
}
</script>

