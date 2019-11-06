import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Field_, Center } from 'src/utils';


const checkRequired = v => (!v || v === '') ? 'این فیلد را پر کنید' : undefined;
const checkMinVal = minVal => v => (!!v && v.length < minVal) ? `باید بیشتر از ${minVal} کاراکتر باشد` : undefined;
const checkMinVal6 = checkMinVal(6);

const LoginForm = reduxForm({ form: 'login' })(
  ({ handleSubmit, pristine, invalid, submitting }) =>
    <Form onSubmit={handleSubmit}>
      <Field component={Field_} Comp={Form.Input}
        name="username" label="نام کاربری" type="text" inline fluid
        required validate={checkRequired} />
      <Field component={Field_} Comp={Form.Input}
        name="password" label="رمز عبور" type="password" inline fluid
        required validate={[checkRequired, checkMinVal6]} />
      <Button type='submit' primary
        disabled={pristine || invalid} loading={submitting}>ورود</Button>
    </Form>
);

const LoginContainer = ({ children }) => <>
  <Segment raised style={{ width: 400 }}>
    {children}
  </Segment>
</>;

export default class Auth extends React.Component {
  onSubmit = async (values) => {
    alert(JSON.stringify(values));
    return new Promise((res, rej) => setTimeout(() => res(), 1000));
  };
  render() {
    return (
      <div style={{ backgroundColor: "#abc" }}>
        <Center>
          <LoginContainer>
            <LoginForm onSubmit={this.onSubmit} />
          </LoginContainer>
        </Center>
      </div>
    );
  }
}
