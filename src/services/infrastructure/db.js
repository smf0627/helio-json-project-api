import Monk from 'monk';

const MONGO_URI = process.env.MONGO_URI || 'localhost/schemata';

export default Monk(MONGO_URI);

