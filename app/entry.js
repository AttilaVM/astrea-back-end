const express = require('express');
// middlewares
const handlers = require("./lib/handlers.js");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const PORT = 3000;

const app = express();

// Activate middlewares
app.use(express.static('public'));
app.use(fileUpload());

app.post("*", handlers.saveVoxelSample);

app.listen(PORT, (e) => {
	console.log(`Listening on ${PORT}`);
});
