var metaData = {
    progress: {
      func: [{
        call: 'color',
        modifier: 'temp',
        argument: '#7000ff'
      }, {
        call: 'fail',
        modifier: 'temp',
        argument: '#6e0000'
      }, {
        call: 'location',
        modifier: 'temp',
        argument: 'top'
      }, {
        call: 'transition',
        modifier: 'temp',
        argument: {
          time: '2.0s',
          opacity: '0.6s'
        }
      }, {
        call: 'inverse',
        modifier: 'temp',
        argument: true
      }, {
        call: 'thickness',
        modifier: 'temp',
        argument: '10px'
      }, {
        call: 'trail',
        modifier: 'temp',
        argument: '-1px'
      }, {
        call: 'bounce',
        modifier: 'temp',
        argument: true
      }, {
        call: 'gradient',
        modifier: 'temp',
        argument: {
          use: true,
          gradient: 'predefined'
        }
      }]
    }
  }
export default [{
  path: '/home',
  name: 'home'
}]