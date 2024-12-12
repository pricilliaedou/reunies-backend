const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { unique: true, type: String },
  account: {
    username: { unique: true, type: String },
    nom: { required: true, type: String },
    prenom: { required: true, type: String },
  },
  ville: { required: true, type: String },
  region: { required: true, type: String },
  entreprise: { required: true, type: String },
  activite: { required: true, type: String },
  description: { required: true, type: String, maxlength: 50 },
  reseaux: { required: true, type: String },

  commentaire: String,
  site: {
    type: String,
    match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
