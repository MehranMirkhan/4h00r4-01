import React from 'react';
import { Table, Icon, Menu, Statistic, Dropdown, Image } from 'semantic-ui-react';


const Column = (entity, index) => col => {
  let c = { key: col.key + index };
  const value = entity[col.key];
  if (!!col.render) {
    if (typeof col.render === 'string') {
      switch (col.render) {
        case 'boolean':
          const trueIcon = <Icon name="check" size="large" color="green" />;
          const falseIcon = <Icon name="times" size="large" color="red" />;
          c.children = !!value ? trueIcon : falseIcon;
          break;
        case 'image':
          c.children = <Image src={value} size="large"/>;
          break;
        default:
          c.children = null;
      }
    } else {
      c.children = col.render(entity);
    }
  } else {
    c.children = value;
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

const Header = (schema, sortCol, sortDir, handleSort) => {
  return schema.map(col => ({
    key: col.key,
    sorted: sortCol === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : null,
    onClick: () => {
      if (col.sortable)
        handleSort(col.key, sortCol === col.key ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc');
    },
    children: col.header,
  }));
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

export default function MyTable({ schema, data, pagination, sortCol, sortDir, onSort }) {
  if (!data) data = [];
  return <Table celled sortable
    headerRow={Header(schema, sortCol, sortDir, onSort)}
    renderBodyRow={Row(schema)}
    footerRow={!!pagination ? Pagination(schema.length, pagination) : undefined}
    tableData={data} />;
}
