require("../models/database");
const Category = require("../models/Category");
const Disease = require("../models/Disease");

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Disease.find({}).sort({ _id: -1 }).limit(limitNumber);

    const newdis = { latest };

    res.render("index", {
      title: "Remedy Nest - Home",
      categories,
      newdis,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "Remedy Nest - Home", categories });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Disease.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", { title: "Remedy Nest - Home", categoryById });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

exports.exploreDisease = async (req, res) => {
  try {
    let diseaseId = req.params.id;
    const disease = await Disease.findById(diseaseId);
    res.render("disease", { title: "Remedy Nest - Home", disease });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

exports.renderBMICalculator = (req, res) => {
  res.render("bmiCalculator", { bmiResult: null, user: res.locals.user });
};

exports.calculateBMI = (req, res) => {
  const { weight, height } = req.body;
  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
  res.render("bmiCalculator", { bmiResult: bmi, user: res.locals.user });
};

exports.renderFirstAid = (req, res) => {
  res.render("firstAid", { user: res.locals.user });
};

exports.searchDisease = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let disease = await Disease.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", {
      title: "Remedy Nest - Search",
      disease,
      user: res.locals.user,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
