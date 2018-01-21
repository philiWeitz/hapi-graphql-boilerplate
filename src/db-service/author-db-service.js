
import createDbService from './create-db-service';
import AuthorModel from '../model/author-model';

const authorDbService = createDbService(AuthorModel, {
  // add model specific queries here
});

export default authorDbService;
