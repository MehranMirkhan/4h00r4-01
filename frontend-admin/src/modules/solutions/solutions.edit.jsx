import React from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';

import Layout from 'src/components/Layout';
import { Field_ } from 'src/utils';

import {
  resetEntity, fetchSolution,
  updateSolution, newSolution,
} from './solutions.reducer';
import Solution from './solutions.model';


let SolutionEditForm = ({ initialValues, handleSubmit, submitting, pristine, reset }) => {
  return <Form onSubmit={handleSubmit}>
    <Field component={Field_} as={Form.Input}
      name="id" label={Solution.id.label} type="text" disabled />
    <Field component={Field_} as={Form.Input}
      name="question_id" label={Solution.question_id.label} type="text" disabled />
    <Field component={Field_} as={Form.Input}
      name="text" label={Solution.text.label} type="text" />
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

SolutionEditForm = reduxForm({ form: 'solutions/edit', enableReinitialize: true })(SolutionEditForm);


let SolutionNewForm = ({ handleSubmit, submitting, pristine, reset }) => {
  return <Form onSubmit={handleSubmit}>
    <Field component={Field_} as={Form.Input}
      name="question_id" label={Solution.question_id.label} type="text" disabled />
    <Field component={Field_} as={Form.Input}
      name="text" label={Solution.text.label} type="text" />
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

SolutionNewForm = reduxForm({ form: 'solutions/new' })(SolutionNewForm);


class SolutionEdit extends React.Component {
  fetchEntity = id => {
    return this.props.fetchEntity(id);
  };
  updateEntity = id => values => {
    return this.props.updateEntity(id, values)
      .then(() => this.props.alert.success("پاسخ با موفقیت اصلاح شد"));
  };
  newEntity = values => {
    return this.props.newEntity(values)
      .then(() => {
        this.props.alert.success("پاسخ با موفقیت ایجاد شد");
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
          ? <SolutionEditForm onSubmit={this.updateEntity(id)} initialValues={entity} />
          : <SolutionNewForm onSubmit={this.newEntity} />
        }
      </Segment>
    </Layout>;
  }
}

export default withAlert()(connect(
  state => ({ entity: state.solutions.entity }),
  dispatch => ({
    resetEntity: () => dispatch(resetEntity()),
    fetchEntity: id => dispatch(fetchSolution(id)),
    updateEntity: (id, entity) => dispatch(updateSolution(id, entity)),
    newEntity: entity => dispatch(newSolution(entity)),
  })
)(SolutionEdit));
