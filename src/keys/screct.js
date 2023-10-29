const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("./src/keys/private.key");
const PUBLIC_KEY = fs.readFileSync("./src/keys/public.key");
module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
};
