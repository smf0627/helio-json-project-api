import Monk from 'monk';

const MONGO_URI = process.env.MONGO_URI || 'localhost/restaurants';

export default Monk(MONGO_URI);

