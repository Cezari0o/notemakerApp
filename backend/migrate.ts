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