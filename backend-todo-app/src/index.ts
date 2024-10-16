import { AppDataSource } from './data-source';
import express from 'express';
import { router } from './routes';
import { errorHandler } from './middlewares/ErrorHandlers';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 200,
};
const SERVER_PORT = process.env.SERVER_PORT || 3000;

AppDataSource.initialize()
	.then(async () => {
		console.log('Data Source has been initialized!');
	})
	.catch((error) => {
		console.error('Error during Data Source initialization:', error);
	});

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
	console.log(`Server is running on port ${SERVER_PORT} `);
});
