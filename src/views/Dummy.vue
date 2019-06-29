<template>
<div>
  <h1>Find players online during a given moment</h1>
  <v-select
          :items="servers"
          v-model="selectedServer"
          item-text="attributes.name"
          label="Pick a server"
          return-object
        ></v-select>
  <v-text-field
            label="Pick a start time..."
            :value="startTime | formatDate"
            @focus="triggerStartPicker"
          ></v-text-field>
  <datetime type="datetime" v-model="startTime" ref="startPicker">

  </datetime>
    <v-text-field
            label="Pick an end time..."
            :value="stopTime | formatDate"
            @click="triggerStopPicker"
          ></v-text-field>
  <datetime type="datetime" v-model="stopTime" ref="stopPicker"></datetime>
  <v-btn
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="(loader = 'loading'), (sendRequest())"
    >
      Show me the players!
    </v-btn>
    <ul>
      <li v-for="session in this.nonNullItems" v-bind:key="session.id" >
        <session :session="session"></session>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import session from '@/components/session.vue'

export default {
  name: 'home',
  data () {
      return {
          loader: null,
          data: null,
          startTime: null,
          stopTime: null,
          loading: null,
          servers: null,
          selectedServer: null
      }
  },
  components: {
    session
  },
  computed: {
    nonNullItems: function() {
      if(this.data && this.data.data && this.data.data.data)
      {
        return this.data.data.data;
      }
    }
  },
  methods: {
    sendRequest: function(){
      // Send the request
      this.loading = true;
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU3NzE0OTFlOWI4OWI1MTMiLCJpYXQiOjE1NjAwNzczODcsIm5iZiI6MTU2MDA3NzM4NywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo4MDQ3NyJ9.M-aJpkUKYda-7WCh6SPzlFy1mPYnvvcuGC5QhIszZQY'; // for all requests
      axios
        .get(`https://api.battlemetrics.com/servers/${this.selectedServer.id}/relationships/sessions?start=${this.startTime}&stop=${this.stopTime}`)
        .then(response => {this.data = response; this.loading = false;} )
    },
    triggerStartPicker () {
      // Hacky way to fix BROKEASS timepicker
      this.$nextTick(() => this.$refs.startPicker.open(event));
    },
    triggerStopPicker() {
      // Hacky way to fix BROKEASS timepicker
      this.$nextTick(() => this.$refs.stopPicker.open(event));
    },
    getServers: function(){
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU3NzE0OTFlOWI4OWI1MTMiLCJpYXQiOjE1NjAwNzczODcsIm5iZiI6MTU2MDA3NzM4NywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo4MDQ3NyJ9.M-aJpkUKYda-7WCh6SPzlFy1mPYnvvcuGC5QhIszZQY'; // for all requests
      axios
        .get(`https://api.battlemetrics.com/servers?filter[rcon]=true`)
        .then(response => {this.servers = response.data.data; this.loading = false; })
    }
  },
  watch: {
      // Loading spinner-ish
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 1500)

        this.loader = null
      }
  },
  mounted: function(){
    this.getServers();

    // load cav users, will (most likely) be done when user submits form. If not yet done, will call again on submit in session component.
    this.$store.dispatch('GetActiveUsers', null, {root:true});
  }
}
</script>

<style>
.vdatetime-input {
  display: none;
}
</style>

