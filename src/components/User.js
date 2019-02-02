import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlined from '@material-ui/icons/FiberManualRecordOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import blueGrey from '@material-ui/core/colors/blueGrey';
import green from '@material-ui/core/colors/green';

import UserAvatar from './UserAvatar'

const online = green['500'];
const offline = blueGrey['500'];

const User = ({pubkey, username, lastSeen, isOnline}) => (
  <ListItem button key={pubkey} style={{ display: 'flex', paddingLeft: '5px' }}>
    <div style={{ display: 'flex' }}>
      {isOnline ? <FiberManualRecord style={{ color: online, margin: 'auto' }} /> : <FiberManualRecordOutlined style={{ color: offline, margin: 'auto' }} />}
      <UserAvatar pubkey={pubkey} />
    </div>
    <Tooltip title={`Last seen on ${new Date(lastSeen)}`} placement="top-start">
      <ListItemText primary={username} />
    </Tooltip>
  </ListItem>
);

export default User;
