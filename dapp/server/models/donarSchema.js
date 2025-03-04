const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
    donorID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bloodType: { type: String, required: true }
});

module.exports = mongoose.model("Donar", DonorSchema);

console.log("Donar Schema Imported!");