// eslint-disable-next-line no-unused-vars
import React from 'react';
import ButtonComponent from './ButtonComponent';
import CardComponent from './CardComponent';
import imageHomePage from '../assets/images/image-home-page.png';
import image2HomePage from '../assets/images/image2-home-page.png';
import BarComponent from './BarComponent';
import { UserOutlined, AreaChartOutlined, BulbOutlined, TeamOutlined, PaperClipOutlined } from '@ant-design/icons'

function ContentHomePage() {
    return (
        <>
            <div className="group-title-home-page h-screen flex flex-row items-center justify-center bg-gradient-to-bl from-sky-300 to-blue-900">
                <div className="text-white flex flex-col gap-y-5">
                    <p className="text-4xl font-bold text-center">
                        Quản lý và rút gọn link hiệu quả
                    </p>
                    <p className='text-center italic px-12'>
                        Quản lý, điều hướng các liên kết ra các trang web rút
                        gọn, lên kế hoạch và điều chỉnh lượng truy cập
                    </p>
                    <div className="flex flex-row justify-center gap-x-5">
                        <ButtonComponent
                            typeButton="primary"
                            content="Đăng nhập"
                        />
                        <ButtonComponent
                            typeButton="primary"
                            content="Đăng ký"
                        />
                    </div>
                </div>
                <div className="w-6/12">
                    <img
                        src={imageHomePage}
                        alt="image-home-page"
                        className="transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 duration-300"
                    />
                </div>
            </div>
            <div className="group-introduce-feature flex flex-col items-center pt-20 h-fit pb-20">
                <p className="font-bold text-3xl mb-4">
                    Chúng tôi cung cấp công cụ
                </p>
                <div className="list-feature flex justify-center space-x-12 p-6 mx-24">
                    <CardComponent
                        title="Quản lý Liên Kết Thông Minh"
                        color="purple"
                        content="Với công cụ quản lý liên kết thông minh của chúng tôi, bạn có thể dễ dàng tạo, chỉnh sửa và xóa các liên kết trên trang web của mình. Đảm bảo rằng các liên kết luôn hoạt động đúng cách và đưa người dùng đến nơi họ cần đến."
                    />
                    <CardComponent
                        title="Điều Phối Liên Kết Hiệu Quả"
                        color="yellow"
                        content="Tối ưu hóa trải nghiệm người dùng bằng cách điều phối liên kết thông minh. Chúng tôi cho phép bạn định hướng người dùng đến các trang quan trọng nhất trên trang web của bạn, giúp họ dễ dàng tìm kiếm thông tin và sản phẩm."
                    />
                    <CardComponent
                        title="Tối ưu Hóa SEO"
                        color="blue"
                        content="Nội dung không chỉ quan trọng, mà cách bạn quản lý liên kết cũng ảnh hưởng đến SEO. Chúng tôi hỗ trợ bạn trong việc tối ưu hóa từ khóa, thẻ tiêu đề và nội dung trang để đảm bảo trang web của bạn đạt được vị trí tốt trên các kết quả tìm kiếm."
                    />
                    <CardComponent
                        title="Theo Dõi Hiệu Suất"
                        color="green"
                        content="Đừng bỏ lỡ bất kỳ thông tin quan trọng nào. Chúng tôi cung cấp công cụ theo dõi hiệu suất liên kết, cho phép bạn biết được liên kết nào được nhấp nhiều nhất, từ khóa nào đang hoạt động tốt, và thậm chí là nguồn traffic cụ thể."
                    />
                </div>
            </div>
            <div className='group-analyze-feature h-fit flex flex-col items-center mb-20'>
                <p className='text-4xl font-bold mb-20'>Tại sao chọn chúng tôi</p>
                <div className='flex flex-row w-full px-20'>
                    <div className='basis-1/2'>
                        <img src={image2HomePage} alt="image2-home-page" className='w-4/5'/>
                    </div>
                    <div className='basis-1/2'>
                        <p className='mb-5'>Chúng tôi không chỉ là công cụ quản lý và điều phối liên kết. Chúng tôi là đối tác của bạn trong việc xây dựng trang web tốt hơn. Với kinh nghiệm và kiến thức sâu rộ về SEO và quản lý liên kết, chúng tôi cam kết đem lại giá trị thực sự cho dự án của bạn.</p>
                        <BarComponent color='purple' icon={<UserOutlined/>} content='Hướng Tiếp Cận Dựa trên Người Dùng'/>
                        <BarComponent color='red' icon={<AreaChartOutlined/>} content='Thông Tin Hiệu Suất Toàn Diện' />
                        <BarComponent color='green' icon={<BulbOutlined />} content='Giải Pháp Tùy Chỉnh' />
                        <BarComponent color='blue' icon={<TeamOutlined />} content='Đối Tác và Hỗ Trợ' />
                        <BarComponent color='yellow' icon={<PaperClipOutlined />} content='Chuyên Môn về Quản lý Liên Kết và SEO' />
                    </div>
                </div>

            </div>
        </>
    );
}

export default ContentHomePage;
