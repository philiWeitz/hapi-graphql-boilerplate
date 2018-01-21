const _ = require('lodash');
const Objection = require('objection');

const { Model } = Objection;
const snakeCase = _.memoize(_.snakeCase);
const camelCase = _.memoize(_.camelCase);

const createModel = ({
  tableName,
  jsonSchema,
  afterRead,
  relationMappings = {},
}) => {
  function BaseModel() {
    Model.apply(this);
  }
  Model.extend(BaseModel);

  BaseModel.tableName = tableName;
  BaseModel.jsonSchema = jsonSchema;
  BaseModel.relationMappings = relationMappings;

  // eslint-disable-next-line
  BaseModel.prototype.$formatDatabaseJson = function (json) {
    const formattedJson = Model.prototype.$formatDatabaseJson.call(this, json);
    return _.mapKeys(formattedJson, (value, key) => {
      return snakeCase(key);
    });
  };

  // eslint-disable-next-line
  BaseModel.prototype.$parseDatabaseJson = function (json) {
    const formattedJson = _.mapKeys(json, (value, key) => {
      return camelCase(key);
    });
    if (afterRead) {
      return Model.prototype.$parseDatabaseJson.call(this, afterRead(formattedJson));
    }
    return Model.prototype.$parseDatabaseJson.call(this, formattedJson);
  };

  // eslint-disable-next-line
  BaseModel.prototype.$beforeInsert = function () {
    // const now = new Date().toISOString();
    // this.dateCreated = now;
    // this.lastUpdated = now;
  };

  // eslint-disable-next-line
  BaseModel.prototype.$beforeUpdate = function () {
    this.updatedAt = new Date().toISOString();
  };

  return BaseModel;
};

module.exports = createModel;
