import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';

import Layout from 'src/components/Layout';
import { Field_ } from 'src/utils';

import {
  resetEntity, fetchQuestion,
  updateQuestion, newQuestion,
} from './questions.reducer';
import Question from './questions.model';


let QuestionEditForm = ({ initialValues, handleSubmit, submitting, pristine, reset }) => {
  return <Form onSubmit={handleSubmit}>
    <Field component={Field_} as={Form.Input}
      name="id" label={Question.id.label} type="text" disabled />
    <Field component={Field_} as={Form.Input}
      name="text" label={Question.text.label} type="text" />
    <Field component={Field_} as={Form.Dropdown} selection options={Question.time_type.options}
      name="time_type" label={Question.time_type.label} type="select" />
    <Field component={Field_} as={Form.Dropdown} selection options={Question.answer_type.options}
      name="answer_type" label={Question.answer_type.label} type="select" />
    <Field component={Field_} as={Form.Input}
      name="start_time" label={Question.start_time.label} type="text" />
    <Field component={Field_} as={Form.Input}
      name="end_time" label={Question.end_time.label} type="text" />
    <Field component={Field_} as={Form.Input}
      name="score" label={Question.score.label} type="text" />
    <Field component={Field_} as={Form.Input}
      name="tries" label={Question.tries.label} type="text" />
    <div style={{ marginBottom: 16 }}>
      <Button as={Link} to={`/solutions?question_id=${!!initialValues ? initialValues.id : '?'}`}>
        پاسخ‌ها
      </Button>
    </div>
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

QuestionEditForm = reduxForm({ form: 'questions/edit', enableReinitialize: true })(QuestionEditForm);


let QuestionNewForm = ({ handleSubmit, submitting, pristine, reset }) => {
  return <Form onSubmit={handleSubmit}>
    <Field component={Field_} as={Form.Input}
      name="text" label={Question.text.label} type="text" />
    <Field component={Field_} as={Form.Dropdown} selection options={Question.time_type.options}
      name="time_type" label={Question.time_type.label} type="select" />
    <Field component={Field_} as={Form.Dropdown} selection options={Question.answer_type.options}
      name="answer_type" label={Question.answer_type.label} type="select" />
    <Field component={Field_} as={Form.Input}
      name="start_time" label={Question.start_time.label} type="text" />
    <Field component={Field_} as={Form.Input}
      name="end_time" label={Question.end_time.label} type="text" />
    <Field component={Field_} as={Form.Input}
      name="score" label={Question.score.label} type="text" />
    <Field component={Field_} as={Form.Input}
      name="tries" label={Question.tries.label} type="text" />
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

QuestionNewForm = reduxForm({ form: 'questions/new' })(QuestionNewForm);


// let Solutions = ({ question, newSolution, updateSolution, deleteSolution, alert }) => {
//   const newButton =
//     <Button icon color="green" onClick={() => newSolution({ question_id: question.id })}>
//       <Icon name="plus" />
//     </Button>;
//   const updateButton = entity =>
//     <Button icon primary onClick={() => updateSolution(entity.id, entity)}>
//       <Icon name="save" />
//     </Button>;
//   const deleteButton = entity =>
//     <Modal
//       trigger={
//         <Button icon color="red">
//           <Icon name="times" />
//         </Button>
//       }
//       header='هشدار!'
//       content={`آیا از حذف پاسخ با ID ${entity.id} اطمینان دارید؟`}
//       actions={[
//         {
//           key: 'yes', content: 'بله', negative: true,
//           onClick: () => deleteSolution(!!entity ? entity.id : undefined)
//             .then(() => alert.success("پاسخ با موفقیت حذف شد"))
//         },
//         { key: 'no', content: 'خیر' },
//       ]}
//     />;
//   const actionButtons = entity =>
//     <>
//       {updateButton(entity)}
//       {deleteButton(entity)}
//     </>;
//   const schema = [
//     { key: "operations", header: "عملیات", render: actionButtons },
//     { key: "id", header: Solution.id.label },
//     { key: "text", header: Solution.text.label },
//   ];
//   return <Table schema={schema} data={data} pagination={pagination} />;
// };

// Solutions = withAlert()(connect(null, dispatch => ({
//   newSolution: entity => dispatch(newSolution(entity)),
//   updateSolution: (id, entity) => dispatch(updateSolution(id, entity)),
//   deleteSolution: id => dispatch(deleteSolution(id)),
// }))(Solutions));


class QuestionEdit extends React.Component {
  fetchEntity = id => {
    return this.props.fetchEntity(id);
  };
  updateEntity = id => values => {
    return this.props.updateEntity(id, values)
      .then(() => this.props.alert.success("سؤال با موفقیت اصلاح شد"));
  };
  newEntity = values => {
    return this.props.newEntity(values)
      .then(() => {
        this.props.alert.success("سؤال با موفقیت ایجاد شد");
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
          ? <QuestionEditForm onSubmit={this.updateEntity(id)} initialValues={entity} />
          : <QuestionNewForm onSubmit={this.newEntity} />
        }
      </Segment>
    </Layout>;
  }
}

export default withAlert()(connect(
  state => ({ entity: state.questions.entity }),
  dispatch => ({
    resetEntity: () => dispatch(resetEntity()),
    fetchEntity: id => dispatch(fetchQuestion(id)),
    updateEntity: (id, entity) => dispatch(updateQuestion(id, entity)),
    newEntity: entity => dispatch(newQuestion(entity)),
  })
)(QuestionEdit));
