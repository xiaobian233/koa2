const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");
const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
  return new Promise((res, rej) => {
    con.query(sql, (error, data) => {
      if (error) return rej(error);
      res(data);
    });
  });
}

module.exports = {
  exec,
};
