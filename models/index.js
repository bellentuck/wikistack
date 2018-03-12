const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});
// Specify options in second param on Sequelize constructor,
//  e.g. set logging to false to elminiate verbose sequelize logging

const Page = db.define('page', {
  // field: Sequelize.TEXT,
  title: {type: Sequelize.STRING, allowNull: false},
  urlTitle:	{type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status:	Sequelize.ENUM('closed', 'open'),
  date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
},
  {
    getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
   }
  }
);

Page.beforeValidate(function(instance) {
  instance.urlTitle = urlTitleMaker(instance.title);
})

function urlTitleMaker(title) {
  if(title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  else {
    return Math.random().toString(36).substring(2, 7);
  }
}

const User = db.define('user', {
  // field: Sequelize.TEXT,
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}}
});

module.exports = {
  db,
  Page,
  User
};



