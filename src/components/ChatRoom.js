// @flow
import React, { Fragment, Component, PureComponent, createRef } from 'react';
import { Formik } from 'formik';
import autoscroll from 'autoscroll-react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dropzone from 'react-dropzone';

import Message from './Message';
import ChatHeader from './ChatHeader';
import Userlist from './Userlist';
import WhoIsTyping from './WhoIsTyping';
import EmojiPicker from './chatInput/EmojiPicker';
import ChatTextInput from './chatInput/ChatTextInput';
import FileUploadButton from './chatInput/FileUploadButton';
import { uploadFileAndSend } from '../utils/ipfs';

function onDrop(acceptedFiles, rejectedFiles, ipfs, sendMessage) {
  const file = acceptedFiles[0];
  uploadFileAndSend(ipfs, file, sendMessage);
}

const keyDownHandler = (e, typingEvent, setValue, value) => {
  if(e.shiftKey && e.keyCode === 13) {
	  e.preventDefault();
    const cursor = e.target.selectionStart;
    const newValue = `${value.slice(0, cursor)}\n${value.slice(cursor)}`;
    setValue('chatInput', newValue);
  }
  else if (e.keyCode === 13) {
    e.preventDefault();
    const form = ChatRoomForm.current;
    form.dispatchEvent(new Event("submit"));
  }
  typingEvent(e)
};

const AutoScrollList = autoscroll(List);
const formStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '10%' };
const ChatRoomForm = createRef();
const NameInput = createRef();
const messagesOffset = 185;
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoPanelActive: true
    };
  }

  toggleInfoPanel = () => {
    this.setState({ infoPanelActive: !this.state.infoPanelActive })
  }

  addEmoji(emoji, chatInput, setValue) {
    setValue('chatInput', `${chatInput}:${emoji.id}:`);
    NameInput.current.labelNode.focus();
  }

  render() {
    const { messages, sendMessage, currentChannel, usersTyping, typingEvent, allUsers, ipfs } = this.props;
    const { infoPanelActive } = this.state;
    const messagesHeight = `calc(100vh - ${messagesOffset}px)`;
    return (
      <div style={{ width: '100%', flexWrap: 'nowrap', display: 'flex', boxSizing: 'border-box' }} >
        <Grid xs={12} item>
          <Dropzone
            onDrop={(a, r) => {
              onDrop(a, r, ipfs, sendMessage);
            }}
            disableClick
            style={{ position: 'relative', height: '100%' }}
            activeStyle={{
              backgroundColor: 'grey',
              outline: '5px dashed lightgrey',
              alignSelf: 'center',
              outlineOffset: '-10px'
            }}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              style={{ height: '100%' }}
            >
              <ChatHeader currentChannel={currentChannel} toggleSidebar={this.toggleInfoPanel} />
              <Divider/>
              <Grid container wrap="nowrap">
                <Grid xs={infoPanelActive ? 9 : 12} item style={{ overflowY: 'scroll' }}>
                  <AutoScrollList style={{ height: messagesHeight, overflow: 'scroll' }}>
                    {messages[currentChannel] && messages[currentChannel].map((message) => (
                      <Fragment key={message.data.payload}>
                        <Message {...message} ipfs={ipfs}/>
                        <li>
                          <Divider/>
                        </li>
                      </Fragment>
                    ))}
                  </AutoScrollList>
                  <Formik
                    initialValues={{ chatInput: '' }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      const { chatInput } = values;
                      sendMessage(chatInput);
                      resetForm();
                      setSubmitting(false);
                    }}
                  >
                    {({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       setFieldValue
                    }) => (
                      <div className="chat-input">
                        <form onSubmit={handleSubmit} style={formStyle} ref={ChatRoomForm}>
                          <FileUploadButton ipfs={ipfs} sendMessage={sendMessage} />
                          <ChatTextInput ref={NameInput} handleChange={handleChange} handleTyping={(e) => keyDownHandler(e, typingEvent, setFieldValue, values.chatInput)} handleBlur={handleBlur} chatInput={values.chatInput || ''} />
                          <EmojiPicker addEmoji={(emoji) => this.addEmoji(emoji, values.chatInput, setFieldValue)} />
                          {errors.chatInput && touched.chatInput && errors.chatInput}
                        </form>
                        <WhoIsTyping
                          currentChannel={currentChannel}
                          usersTyping={usersTyping}
                          users={allUsers}/>
                      </div>
                    )}
                  </Formik>
                </Grid>
                <Grid xs={infoPanelActive ? 3 : false} item style={{ overflow: 'auto', borderLeft: '1px solid lightgrey', minHeight: '100vh' }}>{infoPanelActive && <Userlist />}</Grid>
              </Grid>
            </Grid>
          </Dropzone>
        </Grid>
      </div>
    )
  }
}

export default ChatRoom;
