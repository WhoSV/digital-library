import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TextArea(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.review);

  const handleChange = (event) => {
    if (props.onChange) props.onChange(event.target.value);
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField label="Review" multiline rowsMax={6} value={value} onChange={handleChange} variant="outlined" />
    </form>
  );
}
