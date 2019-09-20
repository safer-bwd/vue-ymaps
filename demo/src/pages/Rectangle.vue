<template>
  <div>
    <h1>This is a rectangle demo page</h1>
    <y-map
      style="width: 600px; height: 400px"
      :center="[55.76, 37.64]"
      :zoom="10"
      :suppressMapOpenBlock="true"
    >
      <y-rectangle
        :coordinates.sync="rectangle.coordinates"
        :options="rectangle.options"
      >
      </y-rectangle>
    </y-map>
  </div>
</template>

<script>
import YMap from '@vue-ymaps/components/YMap'
import YRectangle from '@vue-ymaps/components/YRectangle'

export default {
  name: 'rectangle-page',

  components: { YMap, YRectangle },

  data: () => ({
    rectangle: {
      coordinates: [
        [55.76, 37.64],
        [55.80, 37.7],
      ],
      options: {
        strokeWidth: 2,
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
