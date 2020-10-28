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
    padding: '50px',
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
          rating: 0,
        },
      ]);
    }
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
          <ListView list={bookList} theme={theme} type="books" />
        </div>
      ) : (
        <div className={classes.createContiner}>
          <h3>Create new shelve:</h3>
          <Input type="text" onChange={handleInputChange} />
          <CustomButton name="CREATE" btnClick={handleCreate} />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
