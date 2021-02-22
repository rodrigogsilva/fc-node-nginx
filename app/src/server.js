const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) VALUES('Rodrigo')`;
connection.query(sql);

app.get("/", (req, res) => {
  html = "<h1>Full Cycle</h1><ul>";
  connection.query(`SELECT * FROM people`, function (err, result, fields) {
    if (err) throw err;

    result.forEach((row) => {
      html += `<li> ID : ${row["id"]} NOME : ${row["name"]}</li>`;
    });

    html += "</ul>";

    res.send(html);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
