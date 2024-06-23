const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    dbLoader : './src/dbLoader',
    main: "./src/main"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js'
  },
  watch: true
}