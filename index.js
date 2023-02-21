const express = require('express'),
    morgan = require('morgan');
const app = express();

let topTenMovies = [
    {
        title: 'The NeverEnding Story',
        director: 'Wolfgang Petersen'
    },
    {
        title: 'The Lion King',
        director: 'Roger Allers'
    },
    {
        title: 'Jurrasic Park',
        director: 'Steven Spielberg'
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        director: 'Peter Jackson'
    },
    {
        title: 'The Fifth Element',
        director: 'Luc Besson'
    },
    {
        title: 'Who Framed Roger Rabbit',
        director: 'Robert Zemeckis'
    },
    {
        title: 'Beetlejuice',
        director: 'Tim Burton'
    },
    {
        title: 'Falling Down',
        director: 'Joel Schumacher'
    },
    {
        title: 'Fight Club',
        director: 'David Fincher'
    }
];

app.use(morgan('common'));

app.use(express.static("public"));

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my movie app!');
});

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong again!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});