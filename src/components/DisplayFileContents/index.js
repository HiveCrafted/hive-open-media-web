import React, { useCallback } from 'react';
import moment from 'moment';
import { debounce } from 'lodash';

import { Col, Drawer, Row, Button, Input, Table, Tooltip } from 'antd';
import Link from 'antd/es/typography/Link';
const { Search } = Input;

const columns = [
  {
    title: 'Date Uploaded',
    dataIndex: 'Date',
    key: 'Date',
  },
  {
    title: 'Likes',
    dataIndex: 'Likes',
    key: 'Likes',
  },
  {
    title: 'Download Video',
    key: 'Link',
    dataIndex: 'Link',
    render: (link) => (
      <span>
        <Tooltip title="View Video">
          <a href={link} target="_blank" rel="noreferrer">
            <Button
              type="primary"
              // Copy to clipboard functionality
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
              ghost
            >
              Download
            </Button>
          </a>
        </Tooltip>
      </span>
    ),
  },
];
const DisplayFileContents = ({ visible, onClose, documents = [], onSearch, isLoading }) => {
  const search = (value) => {
    delayedQuery(`name contains '${value}'`);
  };

  const delayedQuery = useCallback(
    debounce((q) => onSearch(q), 500),
    []
  );

  return (
    <Drawer title="View TikTok Videos" placement="right" closable={true} onClose={onClose} open={visible} width={900}>
      <Row gutter={16}>
        <Col span={24}>
          <div className="table-card-actions-container">
            <div className="table-search-container">
              <Search
                placeholder="Search TikTok Export"
                onChange={(e) => search(e.target.value)}
                onSearch={(value) => search(value)}
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

export default DisplayFileContents;
