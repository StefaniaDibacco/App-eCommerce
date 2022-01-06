import dotenv from 'dotenv';
dotenv.config();

const venv = {
  PORT: process.env.PORT || 8080,
  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email@ethereal.email',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'password',
  ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'Mattie Langworth',
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV2 || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'shhhhhh',
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '1000h',
};

export default venv;
