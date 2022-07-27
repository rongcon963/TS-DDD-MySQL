import mysql from "mysql2";
import { createPool, Pool, PoolOptions, PoolConnection, Connection } from "mysql2";
import * as promise from 'mysql2/promise';
import config from '../../config/main';
import * as dotenv from "dotenv";
dotenv.config();

// export const createMysqlConnection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME
// });

const createMysqlConnection = async (host: string): Promise<Connection> => {
  const config_option = {
    host: host,
    user: config.DB_USER,
    password: config.DB_PWD,
    database: config.DB_NAME
  }
  return new Promise((resolve, reject) => {
    // const pool = mysql.createPool(config_option);
    // const promisePool = pool.query(`CREATE DATABASE IF NOT EXISTS \`${config_option.database}\`;`);
    // return promisePool;

    // pool.getConnection(function(error, connection){
    //   if (error) reject(error);
    //   resolve(connection);
    // });
    //mysql.createConnection(host);

    const connection = mysql.createConnection(config_option);
    connection.connect((error) => {
      if (error) { 
        reject(error);
        return;
      }

      resolve(connection);
    })
  });
};

const Query = async (connection: Connection, query: string) => {
  new Promise((resolve, reject) => {
    connection.query(query, connection, (error, results) => {
      if(error) {
        reject(error);
      }

      resolve(results);
    });
  });
}

export {createMysqlConnection, Query}