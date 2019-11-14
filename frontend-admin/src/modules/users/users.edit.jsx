import React from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import Layout from 'src/components/Layout';
import { fetchUser, updateUser } from './users.reducer';
import { Field_, booleanOptions } from 'src/utils';


let UserEditForm = ({ handleSubmit, submitting, pristine, reset }) => {
  return <Form onSubmit={handleSubmit}>
    <Field component={Field_} as={Form.Input}
      name="name" label="نام" type="text" />
    <Field component={Field_} as={Form.Input}
      name="phone" label="شماره همراه" type="text" />
    <Field component={Field_} as={Form.Input}
      name="email" label="ایمیل" type="text" />
    <Field component={Field_} as={Form.Input}
      name="role" label="نقش" type="text" />
    <Field component={Field_} as={Form.Dropdown} selection
      name="is_active" label="فعال" type="select" options={booleanOptions} />
    <Button type='submit' color='green' disabled={pristine} loading={submitting}>
      <Icon name='check' />
      ذخیره
    </Button>
    <Button type='button' secondary disabled={pristine || submitting} onClick={reset}>
      <Icon name='refresh' />
      لغو تغییرات
    </Button>
  </Form>;
};

UserEditForm = reduxForm({ form: 'users/edit', enableReinitialize: true })(UserEditForm);


class UserEdit extends React.Component {
  fetchEntity = id => {
    return this.props.fetchEntity(id);
  };
  updateEntity = id => values => {
    return this.props.updateEntity(id, values);
  };
  render() {
    const { id } = this.props.match.params;
    const { entity } = this.props;
    if (!entity || (entity.id.toString() !== id))
      this.fetchEntity(id);
    return <Layout>
      <Segment raised padded style={{ maxWidth: 600, margin: '0 auto' }}>
        <UserEditForm onSubmit={this.updateEntity(id)} initialValues={entity} />
      </Segment>
    </Layout>;
  }
}

export default connect(
  state => ({ entity: state.users.entity }),
  dispatch => ({
    fetchEntity: id => dispatch(fetchUser(id)),
    updateEntity: (id, entity) => dispatch(updateUser(id, entity)),
  })
)(UserEdit);
