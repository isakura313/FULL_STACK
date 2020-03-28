const Deal = require("../models/deal.model.js");

//Создаем и сохраняем новое дело
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  // создание своего дела
  const deal = new Deal({
     'text': req.body.text,
     'inner_key': req.body.inner_key
  });


// let deal = ['azxcv']
  //сохраняем дело в нашу базу данных
  Deal.create(deal, (err, data) => {
    console.warn("data equal");
    console.log(data);
    console.log((data))
    if (err)
      res.status(500).send({
        message:
          err.message || "Произошла ошибка во время выполнения кода"
      });
    else 
    res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Deal.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

//  Найти одно дело по одному id
exports.findOne = (req, res) => {
  Deal.findById(req.params.dealId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Нет дела с id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Deal.updateById(
    req.params.customerId,
    new Deal(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating deal with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Deal.remove(req.params.dealId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.dealId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.dealId
        });
      }
    } else res.send({ message: `deal was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Deal.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
