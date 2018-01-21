
import authorDbService from '../db-service/author-db-service';

const authorCore = {

  getAuthor(id) {
    return authorDbService.getById(id);
  },

  deleteAuthor(id) {
    return authorDbService.deleteById(id);
  },
};

export default authorCore;
