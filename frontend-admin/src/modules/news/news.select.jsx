import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

import { fetchAllNews, deleteNews } from './news.reducer';
import News from './news.model';

import SelectLayout from 'src/components/SelectLayout';
import { SelectField, booleanOptions } from 'src/components/FormFields';


function NewsSelect(props) {
  return <SelectLayout {...props}
    title="اخبار"
    entityName="news"
    SearchFields={formProps => <>
      <Form.Group widths='equal'>
        <Field component={SelectField} name="is_active" label={News.is_active.label}
          options={booleanOptions} />
      </Form.Group>
    </>}
    tableSchema={[
      { key: "image", header: News.image.label },
      { key: "is_active", header: News.is_active.label, render: "boolean" },
    ]}
  />;
}

export default connect(state => ({
  entityList: state.news.entityList,
}), dispatch => ({
  fetchMethod: searchParams => dispatch(fetchAllNews(searchParams)),
  deleteAction: id => dispatch(deleteNews(id)),
}))(NewsSelect);
