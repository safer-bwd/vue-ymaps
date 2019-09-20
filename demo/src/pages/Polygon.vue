<template>
  <div>
    <h1>This is a polygon demo page</h1>
    <y-map
      style="width: 600px; height: 400px"
      :center="[55.76, 37.64]"
      :zoom="10"
      :suppressMapOpenBlock="true"
    >
      <y-polygon
        :coordinates.sync="polygon.coordinates"
        :options="polygon.options"
      >
      </y-polygon>
    </y-map>
  </div>
</template>

<script>
import YMap from '@vue-ymaps/components/YMap'
import YPolygon from '@vue-ymaps/components/YPolygon'

export default {
  name: 'polygon-page',

  components: { YMap, YPolygon },

  data: () => ({
    polygon: {
      coordinates: [
        [[55.75, 37.50], [55.75, 37.71], [55.70, 37.70]]
      ],
      options: {
        strokeWidth: 1,
        strokeColor: '#000000',
        fillColor: '#FFFFFF',
        draggable: true
      }
    }
  }),

  methods: {
  }
}

</script>
