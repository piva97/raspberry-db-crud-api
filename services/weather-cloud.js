const https = require("http");

function sendToWeatherCloud() {
  https
    .get("http://api.weathercloud.net/set/wid/7df9ab33539091da/key/641078a2c1c73535c74c7c9e51d01d14/temp/10", (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log("ciao");
        console.log(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
//http://api.weathercloud.net/set/wid/7df9ab33539091da/key/641078a2c1c73535c74c7c9e51d01d14/temp/%d
module.exports = {
  sendToWeatherCloud,
};
