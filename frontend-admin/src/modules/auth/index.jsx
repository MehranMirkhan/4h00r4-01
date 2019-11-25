import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { Center } from 'src/components/Common';
import { login } from './auth.reducer';
import { InputField, CHECKS } from 'src/components/FormFields';


const checkMinLen6 = CHECKS.MIN_LEN(6);

const LoginForm = reduxForm({ form: 'login' })(
  ({ handleSubmit, pristine, invalid, submitting }) =>
    <Form onSubmit={handleSubmit}>
      <Field component={InputField} name="username" label="نام کاربری" autoFocus
        required validate={CHECKS.REQUIRED} />
      <Field component={InputField} name="password" label="رمز عبور" type="password"
        required validate={[CHECKS.REQUIRED, checkMinLen6]} />
      <Button type='submit' primary
        disabled={pristine || invalid} loading={submitting}>ورود</Button>
    </Form>
);

class Auth extends React.Component {
  onSubmit = values => this.props.login(values.username, values.password);
  render() {
    return (
      <div style={{ backgroundColor: "#abc" }}>
        <Center>
          <Segment raised style={{ width: 400 }}>
            <LoginForm onSubmit={this.onSubmit} />
          </Segment>
        </Center>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
}))(Auth);
