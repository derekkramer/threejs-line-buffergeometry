const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('index');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
