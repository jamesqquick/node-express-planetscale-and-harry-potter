import mysql from 'mysql';
const connection = mysql.createConnection(process.env.DATABASE_URL);

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