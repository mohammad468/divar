const { Schema, Types, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, required: false, ref: "Category" },
    parents: { type: [Types.ObjectId], required: false, ref: "Category", default: [] },
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    id: false,
  }
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const categoryModel = model("category", categorySchema);

module.exports = { categoryModel };
