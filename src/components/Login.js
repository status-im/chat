import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { func } from 'prop-types';
import { isNull } from 'lodash';
import StatusJSLogo from '../images/statusjs-logo';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100vh',
  width: '50%'
};
const Login = ({ setupKeyringController, keyStore, wipeKeyStore, connect }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    direction="column"
    style={{ height: '100%' }}
  >

    <Formik
      initialValues={{ password: '', seed: '' }}
  onSubmit={(values, { resetForm, setFieldError }) => {
    const { password, seed } = values;
        setupKeyringController(password, seed)
          .catch(err => {
            setFieldError("password", err.message)
          });
        resetForm();
      }}
    >
      {({
         values,
         errors,
         handleChange,
         handleBlur,
         handleSubmit
      }) => (
        <form onSubmit={handleSubmit} style={containerStyle}>
          <StatusJSLogo />

          <div>
          note that no plugins are required, just a compatible browser. Currently recommended are Chrome and Firefox.<br />
          <strong>Note: This is a proof of concept, and an alpha version. There will be bugs. If you're looking for something more stable try the <a target="_blank" href="https://status.im/get_desktop/">status desktop app</a>.</strong>
          <br />known issues:
          <br />- Only tested in Chrome & Firefox. Reportedly works on android mobile browsers but not on ios (to be confirmed). In theory it should work on any webrtc enabled browser.
          <br />- Direct chats and chat history is currently disabled.
          </div>

          <Button size="large" variant="outlined" color="primary" onClick={() => connect()}>
            USE A ONE TIME RANDOM ACCOUNT (Recommended)
          </Button>

          <div> or for dev purposes:</div>
          {isNull(keyStore) && <TextField
                                 id="seed"
                                 type="text"
                                 name="seed"
                                 rows="4"
                                 multiline
                                 label="Enter your 12 word mnemonic"
                                 variant="outlined"
                                 fullWidth
                                 value={values.seed}
                                 onBlur={handleBlur}
                                 onChange={handleChange}
          />}
          <TextField
            id="password"
            type="password"
            name="password"
            label={isNull(keyStore) ? "Set your password" : "Enter your password to login"}
            variant="outlined"
            fullWidth
            error={errors.password}
            helperText={errors.password}
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {!isNull(keyStore) && <Button size="large" variant="outlined" color="secondary" onClick={wipeKeyStore}>
            RESET ACCOUNT
          </Button>}
        </form>
      )}
    </Formik>
  </Grid>
);

Login.propTypes = {
  setupKeyringController: func.isRequired,
  wipeKeyStore: func.isRequired,
  connect: func.isRequired
};

export default Login;
