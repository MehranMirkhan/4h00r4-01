import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { useDispatch } from 'react-redux';

import { CHECKS, InputField } from 'src/components/FormFields';
import { changePassword } from 'src/modules/auth/auth.reducer';


const PasswordChangeForm = reduxForm({ form: 'settings/password_change' })(
  (props) => {
    const { handleSubmit, submitting, pristine, reset } = props;
    return <Form onSubmit={handleSubmit}>

      <Field component={InputField} type="password" required validate={CHECKS.REQUIRED}
        name="old_password" label="رمز عبور قدیمی" />
      <Field component={InputField} type="password" required validate={CHECKS.REQUIRED}
        name="new_password" label="رمز عبور جدید" />
      <Field component={InputField} type="password" required validate={CHECKS.REQUIRED}
        name="new_password_confirm" label="تکرار رمز عبور جدید" />

      <Button type='submit' color='green' icon labelPosition="left"
        disabled={pristine} loading={submitting}>
        <Icon name='check' />
        ذخیره
      </Button>
      <Button type='button' secondary icon labelPosition="left"
        disabled={pristine || submitting} onClick={reset}>
        <Icon name='refresh' />
        لغو تغییرات
      </Button>
    </Form>;
  });

const PasswordChange = () => {
  const dispatch = useDispatch();
  const onSubmit = values => {
    return dispatch(changePassword(values));
  };
  return <PasswordChangeForm onSubmit={onSubmit} />;
};

export default PasswordChange;
