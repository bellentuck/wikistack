const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
// Specify options in second param on Sequelize constructor,
//  e.g. set logging to false to elminiate verbose sequelize logging

const Page = db.define('page', {
  field: Sequelize.TEXT,
  title: Sequelize.STRING,
  urlTitle:	Sequelize.STRING,
  content: Sequelize.TEXT,
  status:	Sequelize.BOOLEAN   // or Sequelize.STRING ?
});

const User = db.define('user', {
  field: Sequelize.TEXT,
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = {
  db,
  Page,
  User
};



// Fullstack version
// const Page = db.define('page', {
//   title: {
//       type: Sequelize.STRING
//   },
//   urlTitle: {
//       type: Sequelize.STRING
//   },
//   content: {
//       type: Sequelize.TEXT
//   },
//   status: {
//       type: Sequelize.ENUM('open', 'closed')
//   }
// });

// const User = db.define('user', {
//   name: {
//       type: Sequelize.STRING
//   },
//   email: {
//       type: Sequelize.STRING
//   }
// });

// module.exports = {
// Page: Page,
// User: User
// };


