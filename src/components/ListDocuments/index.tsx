import React, { useCallback } from 'react';
import { Button, Tooltip, Drawer, Row, Col, Input, Table } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';

const { Search } = Input;

interface Document {
  // Define the shape of your document here
}

interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string) => JSX.Element;
}

interface ListDocumentsProps {
  visible: boolean;
  onClose: () => void;
  documents: Document[];
  onSearch: (query: string | null | undefined) => void; // Update the type of onSearch prop
  signedInUser: any; // Replace 'any' with the actual type
  onSignOut: () => void;
  isLoading: boolean;
}

const columns: Column[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'modifiedTime',
    key: 'modifiedTime',
    render: (text) => <span>{moment(text).format('Do MMM YYYY HH:mm A')}</span>,
  },
  {
    title: 'Action',
    key: 'status',
    dataIndex: 'status',
    render: (tag) => (
      <span>
        <Tooltip title="View Document">
          <Button type="primary" ghost>
            Select
          </Button>
        </Tooltip>
      </span>
    ),
  }
];

const ListDocuments: React.FC<ListDocumentsProps> = ({ visible, onClose, documents = [], onSearch, signedInUser, onSignOut, isLoading }) => {
  const search = (value: string) => {
    delayedQuery(`name contains '${value}'`);
  };

  const delayedQuery = useCallback(
    debounce((q: string) => onSearch(q), 500),
    []
  );

  return (
    <Drawer
      title="Select Google Drive Document"
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
      width={900}
    >
      <Row gutter={16}>
        <Col span={24}>
          <div style={{ marginBottom: 20 }} className="table-search">
            <p>Signed In as: {`${signedInUser?.Ad} (${signedInUser?.zu})`}</p>
            <Button type="primary" onClick={onSignOut}>
              Sign Out
            </Button>
            <div className="table-search-input">
              <Search
                placeholder="Search Google Drive"
                onChange={(e) => {
                  search(e.target.value);
                }}
                onSearch={(value) => {
                  search(value);
                }}
                className="table-search-input"
                size="large"
                enterButton
              />
            </div>
          </div>

          <Table
            className="table-striped-rows"
            columns={columns}
            dataSource={documents}
            pagination={{ simple: true }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default ListDocuments;
