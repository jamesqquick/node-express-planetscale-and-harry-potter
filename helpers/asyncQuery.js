import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
// const connection = mysql.createConnection(process.env.DATABASE_URL);

const connection = mysql.createConnection({
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password : process.env.DB_PASSWORD,
	ssl : {
		rejectUnauthorized: true
	}
});

export default async (query, values) => {
	return new Promise( (resolve, reject) => {
		connection.query(query, values, (async (err, rows) => {
			if(err)
				reject(err);
			else
				resolve(rows);
		}));
	});
};