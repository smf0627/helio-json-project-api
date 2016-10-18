import DB from './infrastructure/db';

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
  async all(){
    return await restaurants.find();
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
    return await restaurants.findOne(id);
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
   * @param {Object} restaurant
   *
   * @returns {*}
   */
  async update(id, restaurant = {}) {
    return await restaurants.update(id, restaurant);
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
