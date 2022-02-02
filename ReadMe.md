# Harry Potter API with Node/Express and PlanetScale

This is Node/Express project for a Harry Potter API with data stored in a PlanetScale MySQL database.

📖[Blog featuring this repo](https://planetscale.com/blog/create-a-harry-potter-api-with-node-js-express-mysql-and-planetscale)

📺[ YouTube Tutorial](https://youtu.be/GyicOpBFUbw)

## How to Use

Clone the repository.

```bash
git clone https://github.com/jamesqquick/node-express-planetscale-and-harry-potter
```

Then, install the dependencies.

```bash
npm install
```

Then, copy the `.env.example` file into a `.env` file and populate the following properties.

- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_DATABASE

> If you need a MySQL database to work with, you can quickly set one up in [PlanetScale](https://planetscale.com/). After you create your database, you can [create a new password](https://docs.planetscale.com/concepts/connection-strings) to get the necessary credentials for your environment variables.

Next, run the `seed.js` script to create your tables and populate them with Harry Potter data.

```bash
npm run seed
```

Lastly, run the application.

```bash
npm run dev
```
