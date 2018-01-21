
const createDbService = (model, service) => {
  return Object.assign({}, {

    getAll() {
      return model.query();
    },

    getById(id) {
      return model.query().findById(id);
    },

    patchAndFetchById(id, data) {
      return model.query().patchAndFetchById(id, data);
    },

    async deleteById(id) {
      const deleted = await model.query().delete().where({ id }).returning('*');
      return (deleted && deleted.length > 0) ? deleted[0] : null;
    },

  }, service);
};

export default createDbService;
