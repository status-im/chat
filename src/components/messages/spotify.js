import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import SpotifyPlayer from 'react-spotify-player';

// TODO: not exactly bulletproof right now, needs proper regex
function isSpotifyLink(text) {
  return text.indexOf('spotify:') >= 0 ;
}

const SpotifyMessage = ({message}) => (
  <Fragment>
    {isSpotifyLink(message) &&
    <ListItem>
      <SpotifyPlayer
        uri={message}
        size={{ 'width': 300, 'height': 300 }}
        view='list'
        theme='black'
      />
    </ListItem>
    }
  </Fragment>
)

export default SpotifyMessage;
