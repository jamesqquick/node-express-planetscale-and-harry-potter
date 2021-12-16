import express from 'express';
import asyncQuery from './helpers/asyncQuery.js';

const app = express();

app.get('/characters', async (req, res) => {
	let status = 200;
	let retVal = {};
    
	try {
		const query = 'SELECT * FROM hp_character';
		retVal.data = await asyncQuery(query);
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
});

app.get('/characters/:id', async (req, res) => {
	let status = 200;
	let retVal = {};
	
	const {id} = req.params;
	if(isNaN(Number(id))) {
		status = 403;
		retVal.message = 'Invalid request. Please make sure the id you are searching for is a number';
		return res.status(status).json(retVal);
	}
    
	try {
		const query = `SELECT * FROM hp_character WHERE hp_character.id='${id}'`;
		const characters = await asyncQuery(query);
		const character = characters[0];
		retVal.data = character;
		if(!character){
			status = 404;
			retVal.message = `Couldn't find a character with id ${id}`;
		}
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
});

app.get('/wands', async (req, res) => {
	let status = 200;
	let retVal = {};

	try {
		const query = 'SELECT * FROM wand';
		retVal.data = await asyncQuery(query);
		res.status(status).json(retVal);
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
});



app.get('/wands/:id', async (req, res) => {
	let status = 200;
	const retVal = {};

	const {id} = req.params;
    
	if(isNaN(Number(id))) {
		status = 403;
		retVal.message = 'Invalid request. Please make sure the id you are searching for is a number';
		return res.status(status).json(retVal);
	}

	try {
		const query = `SELECT * from wand where wand.id=${id}`;
		const wands = await asyncQuery(query);
		retVal.data = wands[0];
		if(!retVal.data) {
			retVal.message = `Couldn't find a wand with id ${id}`;
		}
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App is running');
});
