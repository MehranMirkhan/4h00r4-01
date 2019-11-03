import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Input_, Center } from 'src/utils';


const loginValidate = values => {
  const errors = {};
  const requiredFields = [
    'username',
    'password',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'این فیلد را پر کنید.';
  });
  if (!!values.password && values.password.length < 6)
    errors.password = 'رمز عبور باید بیشتر از 6 کاراکتر باشد.';
  return errors;
}

const LoginForm = reduxForm({ form: 'login', validate: loginValidate })(
  ({ handleSubmit }) => <>
    <Form onSubmit={handleSubmit}>
      <Field component={Input_} name="username" label="نام کاربری" type="text" inline fluid required />
      <Field component={Input_} name="password" label="رمز عبور" type="password" inline fluid required />
      <Button type='submit' primary>ورود</Button>
    </Form>
  </>
);

const LoginContainer = ({ children }) => <>
  <Segment
    raised
    style={{ width: 400 }}>
    {children}
  </Segment>
</>;

export default class Auth extends React.Component {
  onSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <div style={{backgroundColor: "#abc"}}>
      <Center>
        <LoginContainer>
          <LoginForm onSubmit={this.onSubmit} />
        </LoginContainer>
      </Center>
      </div>
    );
  }
}
