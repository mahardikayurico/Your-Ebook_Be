const usersModels = require("../models/users.models");

const usersControllers = {
  getDetail: (req, res) => {
    // const id = req.params.id;
    return usersModels
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = usersControllers;
