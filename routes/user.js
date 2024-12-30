const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.get("/search", async (req, res) => {
  try {
    const { activite, region, ville } = req.query;
    const filters = {};

    if (activite) {
      filters.activite = activite;
    }
    if (region) {
      filters.region = region;
    }
    if (ville) {
      filters.ville = new RegExp(ville, "i");
    }

    const results = await User.find(filters);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get("/search", async (req, res) => {
//   try {
//     const { activite, region, ville } = req.query;
//     const filters = {};

//     if (activite) {
//       filters.activite = activite;
//     }
//     if (region) {
//       filters.region = region;
//     }
//     if (ville) {
//       filters.ville = new RegExp(ville, "i");
//     }

//     const results = await User.find(filters);
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.post("/inscription", async (req, res) => {
//   try {
//     const {
//       username,
//       email,
//       nom,
//       prenom,
//       password,
//       entreprise,
//       activite,
//       ville,
//       region,
//       description,
//       reseaux,
//       site,
//     } = req.body;

//     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailValid.test(email)) {
//       return res.status(400).json({ error: "Email invalide." });
//     }
//     const formattedEmail = email.trim().toLowerCase();

//     if (!nom || nom.trim().length < 2) {
//       return res
//         .status(400)
//         .json({ error: "Le nom doit avoir au moins deux caractères" });
//     }
//     if (!prenom || prenom.trim().length < 2) {
//       return res
//         .status(400)
//         .json({ error: "Le prénom doit avoir au moins deux caractères" });
//     }

//     const formattedNom = nom.trim();
//     const formattedPrenom = prenom.trim();
//     const formattedUsername = username.trim();

//     const urlValid =
//       /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/;
//     if (site && !urlValid.test(site.trim())) {
//       return res
//         .status(400)
//         .json({ error: "L'adresse du site internet est invalide" });
//     }

//     if (!activite) {
//       return res
//         .status(400)
//         .json({ error: "Veuillez sélectionner une activité" });
//     }

//     const formattedSite = site ? site.trim() : "";

//     if (!username || username.trim().lenth > 12) {
//       res.status(400).json({
//         error: "Le nom d'utilisateur doit avoir un maximum de 12 caractères 😥",
//       });
//     } else {
//       const usernameExist = await User.findOne({
//         "account.username": username,
//       });
//       if (usernameExist === null) {
//         const emailExist = await User.findOne({ email: formattedEmail });
//         if (emailExist === null) {
//           const token = uid2(64);
//           const salt = uid2(16);
//           const hash = SHA256(password + salt).toString(encBase64);

//           const newUser = new User({
//             email: formattedEmail,
//             account: {
//               username: formattedUsername,
//               nom: formattedNom,
//               prenom: formattedPrenom,
//             },
//             ville: ville.trim(),
//             region: region.trim(),
//             entreprise: entreprise.trim(),
//             activite: activite,
//             description: description.trim(),
//             reseaux: reseaux.trim(),
//             site: formattedSite,
//             token: token,
//             salt: salt,
//             hash: hash,
//           });
//           await newUser.save();
//           res.json({
//             _id: newUser._id,
//             account: newUser.account,
//             ville: newUser.ville,
//             region: newUser.region,
//             entreprise: newUser.entreprise,
//             activite: newUser.activite,
//             description: newUser.description,
//             reseaux: newUser.reseaux,
//             site: newUser.site,
//             token: newUser.token,
//           });
//         } else {
//           res.status(409).json({
//             error: "Cet email existe déjà.",
//           });
//         }
//       } else {
//         res.status(409).json({
//           error:
//             "Ce nom d'utilisateur existe déjà, veuillez en choisir un autre.",
//         });
//       }
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.post("/inscription", async (req, res) => {
  try {
    const {
      username = "",
      email = "",
      nom = "",
      prenom = "",
      password = "",
      entreprise = "",
      activite = "",
      ville = "",
      region = "",
      description = "",
      reseaux = "",
      site = "",
      commentaire = "",
    } = req.body;
    console.log("Données reçues :", req.body);

    // Validation des données
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailValid.test(email.trim())) {
      return res.status(400).json({ error: "Email invalide." });
    }
    const formattedEmail = email.trim().toLowerCase();

    if (!nom.trim() || nom.trim().length < 2) {
      return res
        .status(400)
        .json({ error: "Le nom doit avoir au moins deux caractères" });
    }
    if (!prenom.trim() || prenom.trim().length < 2) {
      return res
        .status(400)
        .json({ error: "Le prénom doit avoir au moins deux caractères" });
    }

    const formattedNom = nom.trim();
    const formattedPrenom = prenom.trim();
    const formattedUsername = username.trim();

    // const urlValid =
    //   /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/;
    // if (site && !urlValid.test(site.trim())) {
    //   return res
    //     .status(400)
    //     .json({ error: "L'adresse du site internet est invalide" });
    // }

    if (!activite.trim()) {
      return res
        .status(400)
        .json({ error: "Veuillez sélectionner une activité" });
    }

    const formattedSite = site ? site.trim() : "";

    if (!username.trim() || username.trim().length > 12) {
      return res.status(400).json({
        error: "Le nom d'utilisateur doit avoir un maximum de 12 caractères.",
      });
    }

    const usernameExist = await User.findOne({ "account.username": username });
    if (usernameExist) {
      console.log("Conflit : Nom d'utilisateur déjà existant", username);
      return res.status(409).json({
        error:
          "Ce nom d'utilisateur existe déjà, veuillez en choisir un autre.",
      });
    }

    const emailExist = await User.findOne({ email: formattedEmail });
    if (emailExist) {
      console.log("Conflit : Email déjà existant", formattedEmail);
      return res.status(409).json({ error: "Cet email existe déjà." });
    }

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    const newUser = new User({
      email: formattedEmail,
      account: {
        username: formattedUsername,
        nom: formattedNom,
        prenom: formattedPrenom,
      },
      ville: ville.trim(),
      region: region.trim(),
      entreprise: entreprise.trim(),
      activite: activite,
      description: description.trim(),
      reseaux: reseaux.trim(),
      site: formattedSite,
      commentaire: commentaire.trim(),
      token: token,
      salt: salt,
      hash: hash,
    });

    await newUser.save();
    res.json({
      _id: newUser._id,
      account: newUser.account,
      ville: newUser.ville,
      region: newUser.region,
      entreprise: newUser.entreprise,
      activite: newUser.activite,
      description: newUser.description,
      reseaux: newUser.reseaux,
      site: newUser.site,
      token: newUser.token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/connexion", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      const newHash = SHA256(req.body.password + userExist.salt).toString(
        encBase64
      );
      if (newHash === userExist.hash) {
        res.status(200).json({
          _id: userExist._id,
          account: userExist.account,
          entreprise: userExist.entreprise,
          ville: userExist.ville,
          region: userExist.region,
          description: userExist.description,
          reseaux: userExist.reseaux,
          site: userExist.site,
          token: userExist.token,
        });
      } else {
        res.status(401).json({
          error:
            "Mot de passe ou adresse email incorrect. Si vous n'avez pas de compte, merci de bien vouloir en créer un.",
        });
      }
    } else {
      res.status(401).json({
        error:
          "Mot de passe ou adresse email incorrect. Si vous n'avez pas de compte, merci de bien vouloir en créer un.",
      });
    }
  } catch (error) {
    console.error("Erreur sur /inscription :", error.message);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
