import React from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';

import Layout from 'src/components/Layout';
import { resetEntity, fetchUser, updateUser, newUser } from './users.reducer';
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


let UserNewForm = ({ handleSubmit, submitting, pristine, reset }) => {
  return <Form onSubmit={handleSubmit}>
    <Field component={Field_} as={Form.Input}
      name="name" label="نام" type="text" />
    <Field component={Field_} as={Form.Input}
      name="phone" label="شماره همراه" type="text" />
    <Field component={Field_} as={Form.Input}
      name="email" label="ایمیل" type="text" />
    <Field component={Field_} as={Form.Input}
      name="password" label="رمز عبور" type="password" />
    <Field component={Field_} as={Form.Input}
      name="passwordConfirm" label="تکرار رمز عبور" type="password" />
    <Button type='submit' color='green' disabled={pristine} loading={submitting}>
      <Icon name='check' />
      ذخیره
    </Button>
    <Button type='button' secondary disabled={pristine || submitting} onClick={reset}>
      <Icon name='refresh' />
      پاک‌سازی فرم
    </Button>
  </Form>;
};

UserNewForm = reduxForm({ form: 'users/new' })(UserNewForm);


class UserEdit extends React.Component {
  fetchEntity = id => {
    return this.props.fetchEntity(id);
  };
  updateEntity = id => values => {
    return this.props.updateEntity(id, values)
    .then(() => this.props.alert.success("کاربر با موفقیت اصلاح شد"));
  };
  newEntity = values => {
    return this.props.newEntity(values)
      .then(() => {
        this.props.alert.success("کاربر با موفقیت ایجاد شد");
        this.props.history.goBack();
      });
  };
  render() {
    const { id } = this.props.match.params;
    const { entity } = this.props;
    if (id) {
      if (!entity || (entity.id.toString() !== id))
        this.fetchEntity(id);
    } else if (entity)
      this.props.resetEntity();
    return <Layout>
      <Segment raised padded style={{ maxWidth: 600, margin: '0 auto' }}>
        {id
          ? <UserEditForm onSubmit={this.updateEntity(id)} initialValues={entity} />
          : <UserNewForm onSubmit={this.newEntity} />
        }
      </Segment>
    </Layout>;
  }
}

export default withAlert()(connect(
  state => ({ entity: state.users.entity }),
  dispatch => ({
    resetEntity: () => dispatch(resetEntity()),
    fetchEntity: id => dispatch(fetchUser(id)),
    updateEntity: (id, entity) => dispatch(updateUser(id, entity)),
    newEntity: entity => dispatch(newUser(entity)),
  })
)(UserEdit));
