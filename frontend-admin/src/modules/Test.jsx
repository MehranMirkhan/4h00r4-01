import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { Field_, booleanOptions } from 'src/components/Common';


const TestForm = reduxForm({ form: 'test' })(
  ({ handleSubmit, submitting }) =>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="name" label="نام" type="text" inline fluid />
        <Field component={Field_} as={Form.Input}
          name="phone" label="شماره همراه" type="text" inline fluid />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field component={Form.Input}
          name="role" label="نقش" type="text" inline fluid />
        <Field component={Field_} as={Form.Dropdown}
          name="is_active" label="فعال" type="select" options={booleanOptions} selection />
      </Form.Group>
      <Button type='submit' primary loading={submitting}><Icon name='search'/>جستجو</Button>
    </Form>
);

export default function Test() {
  return <TestForm onSubmit={v => console.log(v)}/>;
}
