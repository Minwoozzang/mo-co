import { ConfigProvider, Pagination } from 'antd';

const PaginationSearch = ({ data, handleChange, maxValue }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          colorText: '#FEFF80',
        },
      }}
    >
      <Pagination
        total={data ? data.length : 0}
        onChange={handleChange}
        defaultCurrent={1}
        defaultPageSize={maxValue}
      />
    </ConfigProvider>
  );
};

export default PaginationSearch;
