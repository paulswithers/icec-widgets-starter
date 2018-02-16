import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { hostname } from 'os';
import cors from 'cors';
import ngrok from 'ngrok';
import fs from 'fs';

import departments from './routes/departments';

const port = (process.env.PORT || 3001);
let app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/departments', employees.findAll);
app.get('/departments/:id', employees.findById);

app.listen(port, () => console.log('Server process ' + process.pid + ' is listening on ' + hostname + ':' + port));

ngrok.connect({
	proto: 'http', 
	addr: port, 
}, (err, url) => {
    const ngrok = JSON.stringify({ https: url });
    fs.writeFile('ngrok.json', ngrok, (err) => {
        if (err) throw err;
        console.log('Use the following url to access the widgets: ' + url);
      });
});