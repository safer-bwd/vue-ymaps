<template>
  <div>
    <h1>This is a circle demo page</h1>
    <y-map
      style="width: 600px; height: 400px"
      :center="[55.76, 37.64]"
      :zoom="10"
      :suppressMapOpenBlock="true"
    >
      <y-circle
        :coordinates.sync="circle.coordinates"
        :radius.sync="circle.radius"
        :options="circle.options"
      >
      </y-circle>
    </y-map>
  </div>
</template>

<script>
import YMap from '@vue-ymaps/components/YMap'
import YCircle from '@vue-ymaps/components/YCircle'

export default {
  name: 'circle-page',

  components: { YMap, YCircle },

  data: () => ({
    circle: {
      coordinates: [55.76, 37.64],
      radius: 5000,
      options: {
        strokeWidth: 5,
        strokeColor: '#0000FF',
        fillColor: '#FFFFFF',
        draggable: true
      }
    }
  }),

  methods: {
  }
}

</script>
