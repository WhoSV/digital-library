import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    marginRight: '20px',
  },
  accordion: {
    backgroundColor: theme.palette.darkBack,
  },
  text: {
    color: theme.palette.darkText,
  },
}));

export default function ListView(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {props.list.map((item, index) => {
        return (
          <Accordion key={item.id} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{item.title}</Typography>
              <Typography className={classes.secondaryHeading}>{item.description.substring(0, 60) + '...'}</Typography>
            </AccordionSummary>

            <AccordionDetails>
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
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
