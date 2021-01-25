
const path = require('path')
function resolve(dir) {
  return path.join(__dirname,dir)
}

const name = "知识大食堂"

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    proxy: {  
      '/api':{
        target: 'http://localhost:3000/v1',
        changOrigin: true,  
        wx:true,
        pathRewrite: {
          '^/api': '' 
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
}