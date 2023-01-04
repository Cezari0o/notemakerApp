
import fs from 'fs/promises';
import User from '../src/users/model';
import Tag from '../src/tags/model';
import Note from '../src/notes/model';
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId;
function transformDoc(doc) {
  doc._id = new ObjectId(doc._id.$oid);
  doc.createdAt = new Date(doc.createdAt.$date);
  doc.lastUpdate = new Date(doc.lastUpdate.$date);

  for(const key in doc) {
    // Checking for ObjectId[] fields
    if (Array.isArray(doc[key]) && doc[key].length > 0 && doc[key][0].$oid) {
      doc[key] = doc[key].map(v => new ObjectId(v.$oid));
    } else if(doc[key].$oid) { // Checking if the field is ObjectId
      doc[key] = new ObjectId(doc[key].$oid);
    }
  }
  return doc;
}


// fix up function to work with mongoose
export async function up() {
  let users = JSON.parse(await fs.readFile('seed-data/users.json', 'utf-8'));
  // console.log(users);
  let tags  = JSON.parse(await fs.readFile('seed-data/tags.json', 'utf-8'));
  let notes = JSON.parse(await fs.readFile('seed-data/notes.json', 'utf-8'));

  users = users.map(transformDoc);
  tags = tags.map(transformDoc);
  notes = notes.map(transformDoc);
  // console.log(tags, notes);

  await User.insertMany(users);
  await Tag.insertMany(tags);
  await Note.insertMany(notes);
}

export async function down() {

  await User.deleteMany({});
  await Tag.deleteMany({});
  await Note.deleteMany({});
}
