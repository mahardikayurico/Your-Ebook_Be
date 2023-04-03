const ebookModels = require("../models/ebook.models");
const { unlink } = require("node:fs");

const Pagination = {
  page: (page, limit) => {
    let result = (page - 1) * limit + 1;
    return result ? result : 0;
  },
};

const ebookControllers = {
  get: (req, res) => {
    let { search, category, sortBy, page, limit } = req.query;
    let offset = Pagination.page(page, limit);
    return ebookModels
      .get(search, category, sortBy, limit, offset)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    // const id = req.params.id;
    return ebookModels
      .getDetail(req.params.id)
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
      file: req.files,
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
  update: (req, res) => {
    const { id } = req.params;
    const { title, img, price, category, delivery, description } = req.body;
    const files = req.files;

    const requestData = {
      id,
      title,
      img,
      price,
      category,
      delivery,
      description,
      file: files,
    };

    ebookModels
      .update(requestData)
      .then((result) => {
        if (result.oldImages && result.oldImages.length > 0) {
          for (let i = 0; i < result.oldImages.length; i++) {
            const imagePath = `src/public/uploads/images/${result.oldImages[i].filename}`;
            unlink(imagePath, (error) => {
              if (error)
                console.log(`Error deleting image ${imagePath}: ${error}`);
              else console.log(`Image ${imagePath} deleted successfully`);
            });
          }
        }
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        console.log(`Error updating product: ${error}`);
        return res.status(500).send({ message: error.message });
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
