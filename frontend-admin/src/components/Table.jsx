import React from 'react';
import { Table, Icon, Menu, Statistic, Dropdown } from 'semantic-ui-react';


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
      c.children = col.render(entity);
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

const Pagination = (colSpan, pagination) => {
  const { current_page, last_page, per_page, setPage, setPageSize } = pagination;
  let pages = [];
  for (let i = current_page - 2; i < current_page + 3; i++) {
    if (i >= 1 && i <= last_page)
      pages.push(<Menu.Item key={`page_${i}`} as='a' active={i === current_page}
        onClick={() => setPage(i)}>{i}</Menu.Item>);
  }
  return (
    <Table.Row>
      <Table.HeaderCell colSpan={colSpan}>
        <Menu pagination style={{ direction: "ltr" }}>
          <Menu.Item as='a' icon onClick={() => pagination.setPage(1)}>
            <Icon name='angle double left' />
          </Menu.Item>
          {pages}
          <Menu.Item as='a' icon onClick={() => pagination.setPage(last_page)}>
            <Icon name='angle double right' />
          </Menu.Item>
        </Menu>
        <span style={{ marginRight: 16 }}>
          <span style={{ marginLeft: 4 }}>در هر صفحه:</span>
          <Dropdown selection value={per_page} style={{ minWidth: 48 }}
            options={[10, 20, 50, 100].map(v => ({ key: v, text: v, value: v }))}
            onChange={(e, { value }) => setPageSize(value)} />
        </span>
        <Statistic size='mini' floated="right">
          <Statistic.Label>تعداد صفحات</Statistic.Label>
          <Statistic.Value>{last_page}</Statistic.Value>
        </Statistic>
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default function MyTable({ schema, data, pagination }) {
  if (!data) data = [];
  return <Table celled
    headerRow={schema.map(col => col.header)}
    renderBodyRow={Row(schema)}
    footerRow={Pagination(schema.length, pagination)}
    tableData={data} />;
}