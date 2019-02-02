import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';

function isImage(text) {
  return text.indexOf("http") >= 0 && (text.indexOf('.jpg') || text.indexOf('.gif'));
}

// TODO: this needs to be reviewed. best to return as a css background-image instead
function displayImage(text) {
  let reg = new RegExp(/\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/);
  let imageUrl = reg.exec(text);
  if (!imageUrl) return (<span></span>);
  return (<img src={imageUrl[0]} alt="" style={{maxWidth: '90%'}} />)
}

const ImageMessage = ({message}) => (
  <Fragment>
    {isImage(message) && displayImage(message)}
  </Fragment>
)

export default ImageMessage;
