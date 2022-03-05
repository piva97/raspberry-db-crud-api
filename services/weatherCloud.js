const https = require("http");
const baseUrl = "http://api.weathercloud.net/";
const configUrl =
  "set/wid/7df9ab33539091da/key/641078a2c1c73535c74c7c9e51d01d14/";
function sendToWeatherCloud(req) {
  const url = `${baseUrl}${configUrl}temp/${req.temperatura}/hum/${req.umidita}/bar/${req.pressione}`;
  https.get(url, (resp) => {
    const { statusCode } = resp;
  });
}

module.exports = {
  sendToWeatherCloud,
};
