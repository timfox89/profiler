import cors from 'cors';
import express = require('express');
import githubProfileRoute from './routes/githubProfile';

const app = express();
const port = 8050;

app.use(cors());

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});

app.use(express.json());

app.use('/githubProfile', githubProfileRoute);

