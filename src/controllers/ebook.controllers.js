const ebookModels = require("../models/ebook.models");
const { unlink } = require("node:fs");

const ebookControllers = {
  getByUserId: (req, res) => {
    // const id = req.params.id;
    return ebookModels
      .getByUserId(req.params.userId)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getById: (req, res) => {
    return ebookModels
      .getById(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  add: (req, res) => {
    const request = {
      ...req.body,
      userId: req.params.userId,
      ebook: req.file.filename,
    };
    return ebookModels
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  remove: (req, res) => {
    return ebookModels
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = ebookControllers;
