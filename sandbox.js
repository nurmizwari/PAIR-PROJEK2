var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("123", salt); //! proses hashing pw

console.log(hash);

// console.log(bcrypt.compareSync('$2a$10$bndDQ6U66EiY9nFVSw5FKeefhlvwPytmQXkx8A27ONKjes5aHBs0a',hash)) //! untuk cek compare pw