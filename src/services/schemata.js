import DB from './infrastructure/db';
import Boom from 'boom';

const schemata = DB.get('schemata');

/**
 * Schemata Service
 *
 * @public
 */
export default {

  /**
   * All the schemata
   *
   * @public
   *
   * @returns {*|Promise|T}
   */
  async all(index = 0, pageSize = 100){
    index = parseInt(index);
    pageSize = parseInt(pageSize);
    const cursor = await schemata.find({}, { rawCursor: true });
    return await cursor.skip(index * pageSize).limit(pageSize).toArray();
  },

  /**
   * Only the favorites
   *
   * @public
   *
   * @returns {*|Promise|T}
   */
  async favorites(){
    return await schemata.find({ isFavorite: true });
  },

  /**
   * Only the Top Rated
   *
   * @public
   *
   * @returns {*|Promise|T}
   */
  async topRated(){
    return await schemata.find({ 'grades.grade': { $in: ['A'] } });
  },

  /**
   * Find a schemata by its Id
   *
   * @public
   *
   * @param {String|ObjectId} id - The id of the schema
   *
   * @returns {Promise|*}
   */
  async findById(id) {
    const result = await schemata.findOne(id);

    if (!result) {
      throw Boom.notFound(`Schema ${id} not found.`, { id, message: `Schema ${id} not found.` })
    }
    return result;
  },

  /**
   * Creates a new schema
   *
   * @public
   *
   * @param {Object} schema
   *
   * @returns {Promise|*}
   */
  async create(schema = {}) {
    return await schemata.insert(schema);
  },

  /**
   * Updates a schema
   *
   * @public
   *
   * @param {String} id
   * @param {Object} fields
   *
   * @returns {*}
   */
  async update(id, fields = {}) {
    const old = await this.findById(id);
    const schema = Object.assign({}, old, fields);

    if (schema._id) {
      delete schema._id;
    }

    await schemata.findOneAndUpdate(id, schema);
    return await this.findById(id);
  },

  /**
   * Deletes a schema
   *
   * @public
   *
   * @param {String} id
   *
   * @returns {*|Promise|void|Object}
   */
  async remove(id) {
    return await schemata.remove(id);
  }
}
