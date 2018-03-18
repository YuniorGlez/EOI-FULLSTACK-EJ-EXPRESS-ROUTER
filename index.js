const express = require('express');
const fs = require('fs');
const app = express();

// Resources routers 
const usersRouter = require('./api/users');

app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(5000);