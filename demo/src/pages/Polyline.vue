<template>
  <div>
    <h1>This is a polyline demo page</h1>
    <y-map
      style="width: 600px; height: 400px"
      :center="[55.76, 37.64]"
      :zoom="10"
      :suppressMapOpenBlock="true"
    >
      <y-polyline
        :coordinates.sync="polyline.coordinates"
        :options="polyline.options"
      >
      </y-polyline>
    </y-map>
  </div>
</template>

<script>
import YMap from '@vue-ymaps/components/YMap'
import YPolyline from '@vue-ymaps/components/YPolyline'

export default {
  name: 'polyline-page',

  components: { YMap, YPolyline },

  data: () => ({
    polyline: {
      coordinates: [
        [55.76, 37.64],
        [55.80, 37.7],
        [55.80, 37.8]
      ],
      options: {
        strokeWidth: 6,
        strokeColor: '#0000FF',
        draggable: true
      }
    }
  }),

  methods: {
  }
}

</script>
