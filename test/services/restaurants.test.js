import Services from  '../../src/services';
import Test from 'ava';

Test.before(t => {
  
});

Test(async t => {
  const restaurants = await Services.restaurants.all();
  t.not(restaurants, []);
});
