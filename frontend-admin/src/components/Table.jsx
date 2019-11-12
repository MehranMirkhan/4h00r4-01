import React from 'react';
import { Table, Icon } from 'semantic-ui-react';


const Column = (entity, index) => col => {
  let c = { key: col.key + index };
  if (!!col.render) {
    if (typeof col.render === 'string') {
      if (col.render === 'boolean') {
        const trueIcon = <Icon name="check" size="large" color="green" />;
        const falseIcon = <Icon name="times" size="large" color="red" />;
        c.children = !!entity[col.key] ? trueIcon : falseIcon;
      }
    } else {
      c.children = col.render(entity[col.key]);
    }
  } else {
    c.children = entity[col.key];
  }
  return c;
};

const Row = schema => (entity, index) => {
  const c = Column(entity, index);
  return {
    key: index,
    cells: schema.map(col => c(col)),
  };
};

export default function MyTable({ schema, data }) {
  return <Table celled
    headerRow={schema.map(col => col.header)}
    renderBodyRow={Row(schema)}
    tableData={data} />;
}
