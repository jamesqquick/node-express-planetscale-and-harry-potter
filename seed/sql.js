
export const dropWandTableSQL = 'DROP TABLE IF EXISTS wand';
export const dropHPCharacterTableSQL = 'DROP TABLE  IF EXISTS hp_character';
export const insertWandSQL = 'INSERT INTO wand (wood, core, wand_length, character_id) VALUES ?';
export const insertHPCharacterSQL = 'INSERT INTO hp_character (full_name, species, gender, house, date_of_birth, year_of_birth, is_wizard, ancestry, eye_colour, hair_colour, wand_id, patronus, is_hogwarts_student, is_hogwarts_staff, is_alive, image) VALUES ?';

export const createHPCharacterTableSQL = `CREATE TABLE hp_character (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    full_name VARCHAR(240), 
    species VARCHAR(40),
    gender VARCHAR(40), 
    house VARCHAR(40), 
    date_of_birth VARCHAR(40), 
    year_of_birth INT UNSIGNED,
    is_wizard BOOLEAN, 
    ancestry VARCHAR(40), 
    eye_colour VARCHAR(40), 
    hair_colour VARCHAR(40), 
    wand_id INT,
    patronus VARCHAR(40), 
    is_hogwarts_student BOOLEAN, 
    is_hogwarts_staff BOOLEAN, 
    is_alive BOOLEAN,
    image VARCHAR(240)
)`;

export const createWandTableSQL = `CREATE TABLE wand (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    wood VARCHAR(240),
    core VARCHAR(240),
    wand_length DECIMAL(5,2),
    character_id INT
)`;