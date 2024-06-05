// model.js
import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  listName: {
    type: String,
    required: true
  }
});

const List = mongoose.model('List', listSchema);
export default List;
