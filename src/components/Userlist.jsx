// TODO: all this logic in this file will come automatically from the status chat client lib when it's ready
//  so stuff like sortUsers, heartBeat & forceUpdate, etc.. will be removed
import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import { ChatContext } from '../context';

import User from './User';

const scrolling = { height: '100vh', overflow: 'scroll' };

const sortUsers = (channelUsers, allUsers) => Object.keys(channelUsers).sort((x,y) => {
  const currentTime = (new Date().getTime());
  const xIsOnline = ((currentTime - allUsers[x].lastSeen) > 10*1000) ? 1 : -1;
  const yIsOnline = ((currentTime - allUsers[y].lastSeen) > 10*1000) ? 1 : -1;

  if (xIsOnline > yIsOnline) return 1;
  if (xIsOnline < yIsOnline) return -1;
  if (x.username < y.username) return -1;
  if (x.username > y.username) return 1;
  return 0;
});

const usersDetails = (channelUsers) => {
  const currentTime = new Date().getTime();
  return (user) => {
    return {
      pubkey: channelUsers[user].pubkey,
      lastSeen: channelUsers[user].lastSeen,
      username: channelUsers[user].username,
      isOnline: (currentTime - channelUsers[user].lastSeen < 10*1000)
    }
  }
}

class Userlist extends PureComponent {

  componentDidMount() {
    this.heartBeat();
  }

  componentWillUnmount() {
    clearInterval(this.heartBeatId);
  }

  heartBeat() {
    this.heartBeatId = setInterval(() => { this.forceUpdate() }, 5000)
  }

  render() {
    return (
      <ChatContext.Consumer>
        {({ channels, currentChannel, users }) => {
           const channelUsers = channels[currentChannel].users;
           const usersList = sortUsers(channelUsers, users);
           const userDetails = usersDetails(channelUsers);
           return (
             <div style={scrolling}>
               <List style={scrolling}>
                 {usersList.map(user => (
                   <User {...userDetails(user)} />
                 ))}
               </List>
             </div>
           )
        }
        }
      </ChatContext.Consumer>
    )
  }
}

export default Userlist;
