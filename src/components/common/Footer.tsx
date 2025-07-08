const Footer = () => {
    return (
        <footer className="flex w-full border-t border-[#B3B3B3] bg-[#FFFBF8]">
            <div className="flex gap-[33px] mt-[15px] text-[#B3B3B3]">
                <div className="flex flex-col gap-[6px] ml-[20px]">
                    <p>서비스 소개</p>
                    <p>광고문의</p>
                    <p>멤버 소개</p>
                </div>
                <div className="flex flex-col gap-[6px]">
                    <p>이용약관</p>
                    <p>개인정보 처리방침</p>
                    <p>신고가이드</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;