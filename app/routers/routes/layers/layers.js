const {
  LayerController,
} = require("../../../http/controller/layers/layers.controller");

const router = require("express").Router();

router.get("/layergroup", LayerController.layerGroups);

module.exports = {
  layerRoutes: router,
};
