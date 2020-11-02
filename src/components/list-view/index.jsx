import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextArea from '../textArea';
import RadioButtonsGroup from '../radioButtonsGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.darkText,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  infoTitle: {
    color: theme.palette.darkText,
    marginRight: 20,
  },
  accordion: {
    backgroundColor: theme.palette.darkBack,
  },
  text: {
    color: theme.palette.darkText,
  },
  inputContainer: {
    margin: 20,
  },
}));

export default function ListView(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [currentShelve, setcurrentShelve] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeShelve = (event, item) => {
    props.onChangeShelve(event.target.value, item);
    setcurrentShelve(event.target.value);
  };

  function handleReviewChange(review, index) {
    props.onChangeReview(review, index);
  }

  function handleRatingChange(rating, index) {
    props.onChangeRating(rating, index);
  }

  return (
    <div className={classes.root}>
      {props.list.map((item, index) => {
        return (
          <Accordion key={item.title} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{item.title}</Typography>
              <Typography className={classes.secondaryHeading}>{item.description.substring(0, 60) + '...'}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {props.type === 'books' ? (
                <div>
                  <Typography className={classes.text}>
                    <span className={classes.infoTitle}>Title: </span>
                    {item.title}
                  </Typography>
                  <Typography className={classes.text}>
                    <span className={classes.infoTitle}>Director: </span>
                    {item.director}
                  </Typography>
                  <Typography className={classes.text}>
                    <span className={classes.infoTitle}>Producer: </span>
                    {item.producer}
                  </Typography>
                  <Typography className={classes.text}>
                    <span className={classes.infoTitle}>Description: </span>
                    {item.description}
                  </Typography>

                  <div className={classes.inputContainer}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id={item.id}>Select Shelve</InputLabel>
                      <Select labelId={item.id} id={item.id} value={currentShelve} onChange={(event) => handleChangeShelve(event, item)} label="Select Shelve">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {props.shelves.map((shelve) => {
                          return <MenuItem value={shelve.title}>{shelve.title}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              ) : (
                item.books.map((el, index) => {
                  return (
                    <Typography className={classes.text}>
                      <span className={classes.infoTitle}> {index} </span>
                      {el.title}
                    </Typography>
                  );
                })
              )}

              <div className={classes.inputContainer}>
                <div>
                  <RadioButtonsGroup rating={item.rating} onChange={(event) => handleRatingChange(event, index)} />
                </div>
                <div>
                  <TextArea value={item.review} onChange={(event) => handleReviewChange(event, index)} />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
