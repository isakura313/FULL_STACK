const sql = require("./db.js");



// конструктор нашего дела
const Deal = function(deal) {
  this.text = deal.text;
  this.inner_key = deal.inner_key;
};


const TableName = 'Deals';



Deal.create = (newDeal, result) => {
  const queryCreate = `INSERT INTO ${TableName} VALUES (NULL, ?)`;

  sql.query(queryCreate, newDeal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Создано дело", { id: res.insertId, ...newDeal });
    result(null, { id: res.insertId, ...newDeal });
  });
};




Deal.findById = (inner_key, result) => {
  const queryFind = `SELECT * FROM ${TableName} WHERE inner_key = ${inner_key}`;

  sql.query(queryFind, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("найдено дело: ", res[0]);
      result(null, res[0]);
      return;
    }

    // когда ничего не удалось найти
    result({ kind: "not_found" }, null);
  });
};

 Deal.getAll = result => {

  queryAll = `SELECT * FROM ${TableName}`;
  sql.query(queryAll, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deals: ", res);
    result(null, res);
  });
};

Deal.updateById = (inner_key, deal, result) => {
  const queryUpdate = `UPDATE ${TableName} SET text = ?  WHERE inner_key = ?`;
  sql.query(
    queryUpdate,
    [deal.text, inner_key],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Обновлено дело ", { inner_key: inner_key, ...deal });
      result(null, { inner_key: inner_key, ...deal });
    }
  );
};

Deal.remove = (inner_key, result) => {
  const queryDelete = `DELETE FROM ${TableName} WHERE inner_key = ?`;
  sql.query(queryDelete, inner_key, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      //  если дело не удалось получить по id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Удален пользователь с  ", id);
    result(null, res);
  });
};

Deal.removeAll = result => {
  const queryDeleteAll = `DELETE FROM ${TableName}`;
  sql.query(queryDeleteAll, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} deals`);
    result(null, res);
  });
};

module.exports = Deal;
