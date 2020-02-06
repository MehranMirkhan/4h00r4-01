import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { resetEntity, fetchNews, updateNews, newNews } from './news.reducer';
import News from './news.model';

import EditLayout from 'src/components/EditLayout';
import { SelectField, InputField, FilePicker, booleanOptions } from 'src/components/FormFields';


function NewsEdit(props) {
  return <EditLayout {...props}
    title="خبر"
    entityName="news"
    NewFields={formProps => <>
      <Field component={FilePicker} name="image" label={News.image.label} />
      <Field component={SelectField} name="is_active" label={News.is_active.label}
        options={booleanOptions} />
    </>}
    EditFields={formProps => <>
      <Field component={InputField} name="id" label={News.id.label} disabled />
      <Field component={FilePicker} name="image" label={News.image.label} disabled />
      <Field component={SelectField} name="is_active" label={News.is_active.label}
        options={booleanOptions} />
    </>}
  />;
}

export default connect(
  state => ({ entity: state.news.entity }),
  dispatch => ({
    resetEntity: params => dispatch(resetEntity(params)),
    fetchEntity: id => dispatch(fetchNews(id)),
    updateEntity: (id, entity) => dispatch(updateNews(id, entity)),
    newEntity: entity => dispatch(newNews(entity)),
  })
)(NewsEdit);
