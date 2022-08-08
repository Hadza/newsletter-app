const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/",
  pluginOptions: {
    quasar: {
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
});
