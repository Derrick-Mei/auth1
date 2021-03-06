const db = require("./dbConfig");
const bcrypt = require("bcryptjs");

function find() {
  return db("users").select("username", "id");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first('username', 'id', 'password');
}

async function add(user) {
  const salt = await bcrypt.genSalt(14);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  const [id] = await db("users").insert(user);
  return findBy({ id });
}

module.exports = {
  find,
  findBy,
  add
};
