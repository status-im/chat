import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class EmojiPicker extends PureComponent {

  state = {
    showEmojis: false
  }

  addEmoji(emoji) {
    console.log(emoji);
    this.setState(({showEmojis: false}), () => {
      this.props.addEmoji(emoji)
    });
  }

  toggleEmojis(e) {
    this.setState(({ showEmojis: !this.state.showEmojis }));
  }

  render() {
    const { showEmojis } = this.state;
    return (
      <Fragment>
        {showEmojis && <Picker onSelect={(emoji) => this.addEmoji(emoji)}
                        style={{ position: 'absolute', bottom: '80px', right: '20px' }}/>}
        <Button onClick={(e) => this.toggleEmojis(e)}>Smile</Button>
      </Fragment>
    )
  };

}

export default EmojiPicker;
