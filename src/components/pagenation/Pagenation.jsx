import { ConfigProvider, Pagination } from 'antd';
import React from 'react';

const Pagenation = ({ DATA, handleChange }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#000000',
        colorText: '#FEFF80',
      },
    }}
  >
    <Pagination
      total={DATA ? DATA.length : 0}
      onChange={handleChange}
      defaultCurrent={1}
      defaultPageSize={12}
    />
  </ConfigProvider>
);

export default Pagenation;
