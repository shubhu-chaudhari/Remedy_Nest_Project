const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  remedies: {
    type: Array,
    required: "This field is required.",
  },
  category: {
    type: String,
    enum: [
      "Respiratory Infections",
      "Digestive Disorders",
      "Joint Pain",
      "Sleep Disorders",
      "Oral Health",
      "Stress",
      "Skin Conditions",
    ],
    required: "This field is required.",
  },
  image: {
    type: String,
    required: "This field is required.",
  },
  links: {
    type: Array,
  },
  disclaimer: {
    type: String,
  },
  supplementaryImages: [{ type: String }],
});

diseaseSchema.index({ name: "text" });

module.exports = mongoose.model("Disease", diseaseSchema);
