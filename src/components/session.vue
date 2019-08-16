<template>
    <span>
        <a v-if="dataFound" :href="'https://7cav.us/rosters/profile?uniqueid=' + cavUser.milpac_id" target="_blank">
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
        // if users have not been loaded yet: get them and complete this action once completed. (bit slow but 99% sure this will never happen)
        if(cavUsers === null)
        {
            await this.$store.dispatch('GetActiveUsers', null, {root:true});
            cavUsers = this.$store.state.cavUsers;
        }
        // Find user in cav api users.
        let bmName = this.session.attributes.name;
        this.cavUser = cavUsers.find(x => `${x.rank_shorthand}.${x.username}` === bmName);
      }
  },
  mounted: function(){
      this.link();
  }
}
</script>

