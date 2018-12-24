import mongoose from 'mongoose';
import config from '../config';

const connect = () => {
  mongoose
    .connect(config.dbUri, { useNewUrlParser: true })
    .then(() => console.log(`🛰  Database connected ${config.dbName}`))
    .catch(err => console.log(`error : ${err}`));

  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
};

export default connect;
