import { createServer } from './createServer';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

createServer().listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}!`);
});
