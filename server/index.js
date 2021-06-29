import express from 'express';
import cors from 'cors';
import api from './api';

const app = express();

app.use(express.json({
    limit: '50mb'
}));
app.use(cors());
app.use("/api/",api);





app.listen(5000, () => {
    console.log('Server is running on the port 5000');
})