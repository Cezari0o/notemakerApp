// import migrate from 'migrate';
// import User from './src/users/model';
// import Note from './src/tags/model';
// import Tag from './src/notes/model';
// import fs from  'fs/promises';

// migrate('db-seed', async function (next) {
//   let users = JSON.parse(await fs.readFile('seed-data/users.json', 'utf-8'));
//   let tags  = JSON.parse(await fs.readFile('seed-data/tags.json', 'utf-8'));
//   let notes = JSON.parse(await fs.readFile('seed-data/notes.json', 'utf-8'));

//   await User.insertMany(users);
//   await Tag.insertMany(tags);
//   await Note.insertMany(notes);

//   next();
// }, async function (next) {

//   User.deleteMany({});
//   Tag.deleteMany({});
//   Note.deleteMany({});

//   next();
// });

// const set = migrate();

// set.on('migration', function (migration, direction) {
//   console.log('%s %s', direction, migration.title);
// });

// set.up(function (err) {
//   if (err) throw err;
//   console.log('migrations successfully ran');
// });

import migrate from 'migrate';
import dotenv from 'dotenv';

dotenv.config();

function migratePls() {
  migrate.load({
    stateStore: '.migrate',
    filterFunction: function (file) {

      if(!(process.env.NODE_ENV === 'development')) {
        
        if(file.includes('db-seed')) {
          return false;
        }
      }

      return true;
    }
  }, function (err, set) {
    if (err) {
      throw err
    }
    set.up(function (err) {
      if (err) {
        throw err
      }
      console.log('Migrations successfully ran!');
    })
  });
}

export default migratePls;