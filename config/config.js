require('dotenv').config();
console.log(process.env.DATABASE_URL)
console.log(process.env.PORT)

module.exports = {
  development: {
    use_env_variable: 'postgresql://user:g5zN0zfCGvkueY9WYIUo5DkeAgZTVA5m@dpg-cq5hjp5ds78s73d251jg-a.oregon-postgres.render.com/hng_task_2_9lwn',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Adjust based on your SSL configuration
      },
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Adjust based on your SSL configuration
      },
    },
  },
};
