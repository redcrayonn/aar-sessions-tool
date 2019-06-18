<template>
<div>
  <h1>Template</h1>
  <v-text-field
            label="start"
            v-model="startTime"
          ></v-text-field>
  <datetime type="datetime" v-model="startTime" ></datetime>
    <v-text-field
            label="start"
            v-model="stopTime"
          ></v-text-field>
  <datetime type="datetime" v-model="stopTime" ></datetime>
  <v-btn
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="(loader = 'loading'), (sendRequest())"
    >
      Get sessions!
    </v-btn>
    <ul>
      <li v-for="session in this.nonNullItems" v-bind:key="session.id" >
        <span>{{session.id}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
      return {
          data: null,
          startTime: null,
          stopTime: null,
          loading: null
      }
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
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU3NzE0OTFlOWI4OWI1MTMiLCJpYXQiOjE1NjAwNzczODcsIm5iZiI6MTU2MDA3NzM4NywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo4MDQ3NyJ9.M-aJpkUKYda-7WCh6SPzlFy1mPYnvvcuGC5QhIszZQY'; // for all requests
      axios
        .get(`https://api.battlemetrics.com/servers/1611557/relationships/sessions?start=${this.startTime}&stop=${this.stopTime}`)
        .then(response => (this.data = response))
    }
  }
}
</script>
