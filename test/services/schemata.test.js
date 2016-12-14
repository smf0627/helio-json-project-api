import Services from  '../../src/services';
import Test from 'ava';

Test.before(t => {

});

Test(async t => {
  const schemata = await Services.schemata.all();
  t.not(schemata, []);
});
