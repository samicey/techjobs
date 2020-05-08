const { app } = require("./app");
const { App } = require("./config");

app.listen(App.PORT, () => {
  console.log("Started server at port " + App.PORT);
});

module.exports = {
  app
}