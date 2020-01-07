import React from 'react';
import { Tab } from 'semantic-ui-react';

import Layout from 'src/components/Layout';

import PasswordChange from './PasswordChange';
import DeveloperContact from './DeveloperContact';


export default function Settings() {
  const panes = [
    { menuItem: 'تغییر رمز عبور', render: () => <Tab.Pane><PasswordChange /></Tab.Pane> },
    { menuItem: 'ارتباط با توسعه‌دهنده', render: () => <Tab.Pane><DeveloperContact /></Tab.Pane> },
  ]
  return (
    <Layout>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </Layout>
  );
}
