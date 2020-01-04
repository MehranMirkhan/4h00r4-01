import React from 'react';
import { Segment } from 'semantic-ui-react';

import Layout from 'src/components/Layout';


function NotFound() {
  return <Layout>
    <Segment raised textAlign="center" color="blue" inverted>
      <h1>صفحه‌ی مورد نظر یافت نشد</h1>
    </Segment>
  </Layout>;
}

export default NotFound;
