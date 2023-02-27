const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use(morgan('common'));

app.use(express.static('public'));

let movies = [
    {
        Title: 'The NeverEnding Story',
        Director: 'Wolfgang Petersen',
        Genre: {
            Name: 'Fantasy'
        }
    },
    {
        Title: 'The Lion King',
        Director: 'Roger Allers'
    },
    {
        Title: 'Jurrasic Park',
        Director: 'Steven Spielberg'
    },
    {
        Title: 'Pulp Fiction',
        Director: 'Quentin Tarantino'
    },
    {
        Title: 'The Lord of the Rings: The Return of the King',
        Director: 'Peter Jackson'
    },
    {
        Title: 'The Fifth Element',
        Director: 'Luc Besson'
    },
    {
        Title: 'Who Framed Roger Rabbit',
        Director: 'Robert Zemeckis'
    },
    {
        Title: 'Beetlejuice',
        Director: 'Tim Burton'
    },
    {
        Title: 'Falling Down',
        Director: 'Joel Schumacher'
    },
    {
        Title: 'Fight Club',
        Director: 'David Fincher'
    }
];

let users = [
    {
        name: 'Tristan',
        id: 1,
        favoriteMovies: []
    }
];

// ---GET requests---
// Get list of movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// Get data by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie not found');
    }
});
// Get genre data by title
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('Genre not found');
    }
});

// Get director data by name
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('Director not found');
    }
});

// ---POST requests---
// Add new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send('Welcome to myFlix, ' + newUser.name + '! :)');
    } else {
        res.status(400).send('Please enter name');
    }
})

//---PUT requests---
// Update user info
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).send('Your name has been updated, ' + updatedUser.name + '!');
    } else {
        res.status(400).send('Please enter a valid ID');
    }
})

// Add movie to favorites by title
app.put('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(movieTitle + " has been added to " + user.name + "'s favorite movies!");
    } else {
        res.status(400).send('Please enter a valid ID');
    }
})

// ---DELETE requests---
// Remove movie from favorites by title
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(movieTitle + " has been removed from " + user.name + "'s favorite movies!");
    } else {
        res.status(400).send('Movie title not found');
    }
})
// Remove user registration
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send("We're sorry to see you go, " + user.name + "! You have successfully been removed.");
    } else {
        res.status(400).send('Please enter a valid ID');
    }
})
// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});