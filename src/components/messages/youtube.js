import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import ListItem from '@material-ui/core/ListItem';

// TODO: not exactly bulletproof right now, needs proper regex
function hasYoutubeLink(text) {
  return text.indexOf('http://www.youtube.com') >= 0 || text.indexOf('https://www.youtube.com') >= 0;
}

// https://gist.github.com/takien/4077195#
function getYoutubeId(url) {
  let ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
  return ID;
}

const YoutubeMessage = ({message}) => (
  <Fragment>
    {hasYoutubeLink(message) &&
    <ListItem>
      <YouTube
        videoId={getYoutubeId(message)}
        opts={{ height: '390', width: '640', playerVars: { autoplay: 0 } }}
      />
    </ListItem>
    }
  </Fragment>
)

export default YoutubeMessage;
