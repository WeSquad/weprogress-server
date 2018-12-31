import mongoose from 'mongoose';

export default async () => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  return mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log(`🛰  Database connected ${process.env.MONGO_DBNAME}`))
    .catch(err => console.log(`error : ${err}`));
};
