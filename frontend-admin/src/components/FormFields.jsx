import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';


export const InputField = ({ input, meta, children, ...props }) =>
  <Form.Input {...props}
    {...input} children={children}
    onChange={(e, { value }) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
  />;

export const EntityField = ({ input, meta, children, entityName, ...props }) =>
  <Form.Input {...props}
    {...input} children={children}
    action={<Button icon="search" as={Link} to={`/${entityName}/select`} />}
    onChange={(e, { value }) => input.onChange(value)}
    error={(!!meta && meta.touched && meta.invalid) ? meta.error : false}
  />;
