const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
// const exphbs = require('express-handlebars');

const app = express();

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

// app.use(logger);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
