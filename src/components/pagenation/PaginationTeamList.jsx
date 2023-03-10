import { ConfigProvider, Pagination } from 'antd';

const PaginationTeamList = ({ data, handleChange }) => {
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
        defaultPageSize={6}
      />
    </ConfigProvider>
  );
};

export default PaginationTeamList;
