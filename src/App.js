import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BrightnessMedium from '@material-ui/icons/BrightnessMedium';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import ListView from './components/list-view';
import Input from './components/input';
import CustomButton from './components/customButton';

import { getBooks } from './actions/books.js';

export const light = {};
export const dark = {
  palette: {
    primary: {
      main: '#333',
    },
    darkText: '#ffffff',
    darkBack: '#272c34;',
    text: {
      secondary: '#ffffff',
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    padding: 50,
    minHeight: '100vh',
    backgroundColor: '#ccc',
  },
  createContiner: {
    textAlign: 'center',
  },
}));

function App() {
  const [bookList, setBookList] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [theme, setTheme] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [activeView, setActiveView] = useState(true);
  const appliedTheme = createMuiTheme(theme ? light : dark);
  const classes = useStyles();

  useEffect(() => {
    getBooks((data) => {
      // add missing keys to the list
      data.map((item) => {
        item.rating = 1;
        item.review = '';

        return item;
      });

      setBookList(data);
    });
  }, []);

  function handleChangeTheme() {
    setTheme(!theme);
  }

  function toggleActiveView() {
    setActiveView(!activeView);
  }

  function handleInputChange(val) {
    setInputValue(val);
  }

  function handleCreate() {
    if (inputValue) {
      setShelves([
        ...shelves,
        {
          title: inputValue,
          description: '',
          books: [],
          rating: 1,
          review: '',
        },
      ]);
    }
  }

  function handleBookReviewChange(review, index) {
    let newArr = [...bookList];
    newArr[index].review = review;
    setBookList(newArr);
  }

  function handleBookRatingChange(rating, index) {
    let newArr = [...bookList];
    newArr[index].rating = rating;
    setBookList(newArr);
  }

  function handleShelveReviewChange(review, index) {
    let newArr = [...shelves];
    newArr[index].review = review;
    setShelves(newArr);
  }

  function handleShelveRatingChange(rating, index) {
    let newArr = [...shelves];
    newArr[index].rating = rating;
    setShelves(newArr);
  }

  function addBookToShelve(shelve, book) {
    let obj = shelves.find((x) => x.title === shelve);
    let index = shelves.indexOf(obj);

    let newArr = [...shelves];
    newArr[index].books.push(book);

    setShelves(newArr);
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Digital library
          </Typography>
          <Button color="inherit" onClick={toggleActiveView}>
            {activeView ? 'Go to Shelves' : 'Go to Book List'}
          </Button>
          <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleChangeTheme} color="inherit">
            <BrightnessMedium />
          </IconButton>
        </Toolbar>
      </AppBar>

      {activeView ? (
        <div className={classes.container}>
          <ListView
            list={bookList}
            shelves={shelves}
            theme={theme}
            type="books"
            onChangeReview={handleBookReviewChange}
            onChangeRating={handleBookRatingChange}
            onChangeShelve={addBookToShelve}
          />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.createContiner}>
            <h3>Create new shelve:</h3>
            <Input type="text" onChange={handleInputChange} />
            <CustomButton name="CREATE" btnClick={handleCreate} />
          </div>

          <ListView list={shelves} theme={theme} type="shelves" onChangeReview={handleShelveReviewChange} onChangeRating={handleShelveRatingChange} />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
