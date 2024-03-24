import React from 'react';
import { Col, Drawer, Row, Button, Table, Tooltip } from 'antd';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

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
        <Tooltip title="Download Video">
          <a href={link} target="_blank" rel="noreferrer">
            <Button
              type="primary"
              // Copy to clipboard functionality
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
              ghost
            >
              Link
            </Button>
          </a>
        </Tooltip>
      </span>
    ),
  },
  {
    title: 'Preview Video',
    key: 'PreviewVideoLink',
    dataIndex: 'Link',
    render: (link) => (
      <span>
        <Tooltip title="Preview Video">
          <Player src={link} muted={true} playsInline={true} preload="auto" />
        </Tooltip>
      </span>
    ),
  },
];
const DisplayFileContents = ({ visible, onClose, documents = [], isLoading }) => {
  return (
    <Drawer title="View TikTok Videos" placement="right" closable={true} onClose={onClose} open={visible} width={900}>
      <Row gutter={16}>
        <Col span={24}>
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
