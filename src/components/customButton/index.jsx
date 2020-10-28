import React from 'react';
import Button from '@material-ui/core/Button';

export default function CustomButton(props) {
  return (
    <Button color="primary" onClick={props.btnClick}>
      {props.name}
    </Button>
  );
}
