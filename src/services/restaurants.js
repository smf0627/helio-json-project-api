import DB from './infrastructure/db';
import Boom from 'boom';

const restaurants = DB.get('restaurants');

/**
 * Restaurants Service
 *
 * @public
 */
export default {
  
  /**
   * All the restaurants
   *
   * @public
   *
   * @returns {*|Promise|T}
   */
  async all(index = 0, pageSize = 100){
    index = parseInt(index);
    pageSize = parseInt(pageSize);
    const cursor = await restaurants.find({}, { rawCursor: true });
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
    return await restaurants.find({ isFavorite: true });
  },
  
  /**
   * Only the Top Rated
   *
   * @public
   *
   * @returns {*|Promise|T}
   */
  async topRated(){
    return await restaurants.find({});
  },
  
  /**
   * Find a restaurant by its Id
   *
   * @public
   *
   * @param {String|ObjectId} id - The id of the restaurant
   *
   * @returns {Promise|*}
   */
  async findById(id) {
    const result = await restaurants.findOne(id);
    
    if (!result) {
      throw Boom.notFound(`Restaurant ${id} not found.`, { id, message: `Restaurant ${id} not found.` })
    }
    return result;
  },
  
  /**
   * Creates a new restaurant
   *
   * @public
   *
   * @param {Object} restaurant
   *
   * @returns {Promise|*}
   */
  async create(restaurant = {}) {
    return await restaurants.insert(restaurant);
  },
  
  /**
   * Updates a restaurant
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
    const restaurant = Object.assign({}, old, fields);
    
    if (restaurant._id) {
      delete restaurant._id;
    }
    
    await restaurants.findOneAndUpdate(id, restaurant);
    return await this.findById(id);
  },
  
  /**
   * Deletes a restaurant
   *
   * @public
   *
   * @param {String} id
   *
   * @returns {*|Promise|void|Object}
   */
  async remove(id) {
    return await restaurants.remove(id);
  }
}
