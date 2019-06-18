<template>
<div>
  <h1>Template</h1>
  <v-text-field
            label="start"
            v-model="startTime"
            @focus="triggerStartPicker"
            slot="before"
          ></v-text-field>
  <datetime type="datetime" v-model="startTime" ref="startPicker">

  </datetime>
    <v-text-field
            label="start"
            v-model="stopTime"
            @click="triggerStopPicker"
          ></v-text-field>
  <datetime type="datetime" v-model="stopTime" ref="stopPicker"></datetime>
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
          loader: null,
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
      // Send the request
      this.loading = true;
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU3NzE0OTFlOWI4OWI1MTMiLCJpYXQiOjE1NjAwNzczODcsIm5iZiI6MTU2MDA3NzM4NywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo4MDQ3NyJ9.M-aJpkUKYda-7WCh6SPzlFy1mPYnvvcuGC5QhIszZQY'; // for all requests
      axios
        .get(`https://api.battlemetrics.com/servers/1611557/relationships/sessions?start=${this.startTime}&stop=${this.stopTime}`)
        .then(response => (this.data = response), (this.loading = false))
    },
    triggerStartPicker () {
      // Hacky way to fix BROKEASS timepicker
      this.$nextTick(() => this.$refs.startPicker.open(event));
    },
    triggerStopPicker() {
      // Hacky way to fix BROKEASS timepicker
      this.$nextTick(() => this.$refs.stopPicker.open(event));
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
  }
}
</script>

<style>
.vdatetime-input {
  display: none;
}
</style>

