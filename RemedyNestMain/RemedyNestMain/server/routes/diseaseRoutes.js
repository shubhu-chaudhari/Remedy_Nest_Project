const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseaseController");

router.get("/", diseaseController.homepage);
router.get("/disease/:id", diseaseController.exploreDisease);
router.get("/categories", diseaseController.exploreCategories);
router.get("/categories/:id", diseaseController.exploreCategoriesById);
router.post("/search", diseaseController.searchDisease);

router.get("/bmiCalculator", diseaseController.renderBMICalculator);
router.post("/calculateBMI", diseaseController.calculateBMI);

router.get("/firstAid", diseaseController.renderFirstAid);

module.exports = router;
