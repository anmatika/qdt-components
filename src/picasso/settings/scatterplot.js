export default {
  scales: {
    s: {
      data: { field: 'qMeasureInfo/0' },
      expand: 0.2,
      invert: true,
    },
    m: {
      data: { field: 'qMeasureInfo/1' },
      expand: 0.1,
    },
    col: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      type: 'color',
    },
  },
  components: [{
    key: 'y-axis',
    type: 'axis',
    scale: 's',
    dock: 'left',
  }, {
    type: 'legend-cat',
    key: 'legend',
    dock: 'right',
    scale: 'col',
    brush: {
      trigger: [{
        on: 'tap',
        contexts: ['select'],
      }],
      consume: [{
        context: 'select',
        style: {
          active: {
            opacity: 1,
          },
          inactive: {
            opacity: 0.5,
          },
        },
      }],
    },
  }, {
    key: 'x-axis',
    type: 'axis',
    scale: 'm',
    dock: 'bottom',
  }, {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    key: 'domPointLabel',
    type: 'domPointLabel',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
          x: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      x: { scale: 'm' },
      y: { scale: 's' },
      fontSize: '10px',
      color: '#000000',
      offset: 15,
      width: 50,
      height: 10,
    },
  }, {
    key: 'point',
    type: 'point',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
          x: { field: 'qMeasureInfo/1' },
          num: { field: 'qMeasureInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
          qMeasure2: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      x: { scale: 'm' },
      y: { scale: 's' },
      shape: 'circle',
      size: 0.2,
      strokeWidth: 2,
      stroke: '#fff',
      opacity: 0.8,
      fill: { scale: 'col' },
    },
    brush: {
      trigger: [{
        on: 'tap',
        contexts: ['select'],
      }],
      consume: [{
        context: 'select',
        style: {
          active: {
            opacity: 1,
          },
          inactive: {
            opacity: 0.5,
          },
        },
      }],
    },
  }],
  interactions: [
    {
      type: 'native',
      events: {
        mousemove(e) {
          this.chart.component('tooltip').emit('hover', e);
        },
        wheel: function w(e) {
          if (e) {
            const components = this.chart.componentsFromPoint(e);
            components.forEach((comp) => {
              comp.emit('scroll', e.deltaY);
            });
            e.preventDefault();
          }
        },
      },
    },
  ],
};
