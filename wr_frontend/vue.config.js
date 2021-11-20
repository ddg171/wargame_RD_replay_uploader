module.exports = {
  port:8080,
  transpileDependencies: ["vuetify"],
  outputDir:"../wr_server_front/src/dist",
  devServer:{
    proxy: {
      '/api/': {
          target: 'http://localhost:3000'
      }
  }
  }
};
