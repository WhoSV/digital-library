import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  customInput: {
    height: '30px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    margin: '10px',
  },
}));

export default function Input(props) {
  const classes = useStyles();
  const [inputType] = useState(props.type);

  function handleChange(event) {
    if (props.onChange) props.onChange(event.target.value);
  }

  return <input className={classes.customInput} type={inputType} onChange={handleChange} />;
}
