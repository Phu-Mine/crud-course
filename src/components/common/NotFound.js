import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <Result
        status="404"
        title="404"
        subTitle="Xin lỗi trang bạn muốn truy cập không tồn tại, hãy quay lại sau!"
        extra={<Button type="primary"><Link to="/dashboard">Back Home</Link></Button>}
    />
);
export default NotFoundPage;