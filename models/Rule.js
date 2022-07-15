const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
Rule validation failed: eventId: Path `eventId` is required., ruleCategory: Path `ruleCategory` is required., ruleDescription: Path `ruleDescription` is required., ruleName: Path `ruleName` is required., ruleId: Path `ruleId` is required.
*/
//create a mongoDB schema
const ruleSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  eventID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    //required: true,
    default: "abcd",
  },
  desc: {
    type: String,
    //required: true,
    default: "abcde",
  },
  category: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
  ruleLogicFormat: {
    type: Object,
    required: true,
  },
  eventID: {
    type: String,
    required: true,
    default: "1234",
  },
  userID: {
    type: String,
    //required: true,
    default: "1234",
  },
  createdByUser: {
    type: String,
    //required: true,
    default: "Omer",
  },
  modifiedByUser: {
    type: String,
    //required: true,
    default: "Mert",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Rule", ruleSchema);
