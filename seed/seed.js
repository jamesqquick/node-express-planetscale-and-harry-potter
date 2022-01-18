import axios from 'axios';
import { createHPCharacterTableSQL, createWandTableSQL, dropHPCharacterTableSQL, dropWandTableSQL, insertHPCharacterSQL, insertWandSQL } from './sql.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const characterIndexToWandIndex  = {};

const loadAndSaveData = async () => {
	try {
		//clear the existing records
		await connection.execute(dropWandTableSQL);
		console.log('***dropped wand table***');
		
		await connection.execute(dropHPCharacterTableSQL);
		console.log('***dropped hp_character table***');

		await connection.execute(createWandTableSQL);        
		console.log('***created wand table***');

		await connection.execute(createHPCharacterTableSQL);        
		console.log('***created hp_character table***');

        
		//load raw data from api
		const {data} = await axios.get('http://hp-api.herokuapp.com/api/characters');
        
		//save the wands
		const wands = getWandDataToSave(data);
		// console.log(wands);
		await connection.query(insertWandSQL, [wands]);
		console.log('***wands saved***');
    
		// //save the characters
		const characters = getCharacterDataToSave(data);
		await connection.query(insertHPCharacterSQL, [characters]);        
		console.log('***characters saved***');
    
	}catch(err){
		console.error(err);
    
	}
};

const getWandDataToSave = (data) => {
	const wands = data.map((character, i) => {
		const wand = [...Object.values(character.wand)];
		wand[3] = i + 1;
		if(wand[2] === '') {
			wand[2] = null;
		}
		return wand;
	}).filter((wand,i) => {
		const isValidWand = wand[0] || wand[1] || wand[2];
		if(isValidWand){
			characterIndexToWandIndex[i] = Object.keys(characterIndexToWandIndex).length;
		}else {
			characterIndexToWandIndex[i] === null;
		}
		return isValidWand;
	});
	return wands;
};

const getCharacterDataToSave = (data) =>{
	const formattedCharacters = data.map((character, i) => {
		delete character['alternate_names'];
		delete character['alternate_actors'];
		delete character['actor'];
		const retVal = Object.values(character);
		retVal[5] = retVal[5] || null;
		retVal[10] = characterIndexToWandIndex[i] || characterIndexToWandIndex[i] === 0 ? characterIndexToWandIndex[i] + 1: null ;
		return retVal;
	});
	const characters = formattedCharacters.map((character) => Object.values(character));
	return characters;
};

await loadAndSaveData();
