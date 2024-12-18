import { GeoServerRestClient } from "geoserver-node-client";

class LayerController {
  async layerGroups(req, res, next) {
    try {
      const geoserverUrl = process.env.GEOSERVER_URL;
      const username = "admin";
      const password = "geoserver";
      console.log(geoserverUrl, username, password);
      const response = await fetch(`${geoserverUrl}/rest/layergroups`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString("base64")}`,

          "Content-Type": "application/json",
        },
      });
      //   console.log(await response.json());
      return res.status(200).json(await response.json());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { LayerController: new LayerController() };
