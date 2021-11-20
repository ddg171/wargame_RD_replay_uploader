module.exports = {
  
  transpileDependencies: ["vuetify"],
  outputDir:"../wr_server_front/src/dist",
  devServer:{
    port:8080,
    proxy: {
      '^/api/': {
          target: 'http://localhost:3000',
          changeOrigin:true,
          logLevel: 'debug'
      }
  }
  }
};
