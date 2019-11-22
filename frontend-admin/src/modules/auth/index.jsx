import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { Center, Field_, CHECKS } from 'src/components/Common';
import { login } from './auth.reducer';


const checkMinLen6 = CHECKS.MIN_LEN(6);

const LoginForm = reduxForm({ form: 'login' })(
  ({ handleSubmit, pristine, invalid, submitting }) =>
    <Form onSubmit={handleSubmit}>
      <Field component={Field_} as={Form.Input}
        name="username" label="نام کاربری" type="text" inline fluid autoFocus
        required validate={CHECKS.REQUIRED} />
      <Field component={Field_} as={Form.Input}
        name="password" label="رمز عبور" type="password" inline fluid
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
