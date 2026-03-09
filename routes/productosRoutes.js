const router = require("express").Router();
const upload = require("../middleware/upload.js");

const { Router } = require("express");
const controllerProducts = require("../controller/product.js");



router.route("/")
    .post(upload.single("img"),controllerProducts.createProduct)

router.post("/upload", upload.none(), upload.single("img"),controllerProducts.createProduct)

router.put("/sendImages", upload.array("imgs", 2))


module.exports = router;