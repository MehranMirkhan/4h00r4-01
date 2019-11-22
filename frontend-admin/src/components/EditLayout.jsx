import React from 'react';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';
import qs from 'query-string';

import Layout from 'src/components/Layout';
import { BackButton } from 'src/components/Common';


const EditForm = (entityName, Fields, isNew) =>
  reduxForm({ form: `${entityName}/${isNew ? 'new' : 'edit'}`, enableReinitialize: true })(
    props => {
      const { handleSubmit, submitting, pristine, reset } = props;
      return <Form onSubmit={handleSubmit}>

        {Fields(props)}

        <Button type='submit' color='green' disabled={pristine} loading={submitting}>
          <Icon name='check' />
          ذخیره
        </Button>
        <Button type='button' secondary disabled={pristine || submitting} onClick={reset}>
          <Icon name='refresh' />
          لغو تغییرات
        </Button>
      </Form>;
    }
  );

class EditLayout extends React.Component {
  NF = undefined;
  EF = undefined;
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id)
      this.fetchEntity(id);
    else
      this.props.resetEntity(qs.parse(this.props.location.search));
  }
  initForms() {
    this.NF = EditForm(this.props.entityName, this.props.NewFields, true);
    this.EF = EditForm(this.props.entityName, this.props.EditFields, false);
  }
  fetchEntity = id => {
    return this.props.fetchEntity(id);
  };
  updateEntity = id => values => {
    return this.props.updateEntity(id, values)
      .then(() => this.props.alert.success("رکورد با موفقیت اصلاح شد"));
  };
  newEntity = values => {
    return this.props.newEntity(values)
      .then(() => {
        this.props.alert.success("رکورد با موفقیت ایجاد شد");
        this.props.history.goBack();
      });
  };
  render() {
    if (this.props.NewFields && !this.NF) this.initForms();
    if (this.props.EditFields && !this.EF) this.initForms();
    const { id } = this.props.match.params;
    const { entity } = this.props;
    return <Layout>
      <Segment raised padded style={{ maxWidth: 600, margin: '0 auto' }}>
        <BackButton history={this.props.history} />
        {id
          ? (this.props.EditFields && <this.EF onSubmit={this.updateEntity(id)} initialValues={entity} />)
          : (this.props.NewFields && <this.NF onSubmit={this.newEntity} initialValues={entity} />)}
      </Segment>
    </Layout>;
  }
}

export default withAlert()(EditLayout);
