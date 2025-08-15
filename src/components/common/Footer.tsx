const Footer = () => {
  return (
    <footer className="flex w-full border-t border-[#B3B3B3]">
      <div className="flex gap-[33px] mt-[15px] text-[#B3B3B3]">
        <div className="flex flex-col gap-[6px] ml-[20px]">
          <a
            href="https://humane-trollius-aaf.notion.site/Oops-24f794923899800cbae1f5780c547eb3?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            서비스 소개
          </a>
          <p>광고문의</p>
          <p>멤버 소개</p>
        </div>
        <div className="flex flex-col gap-[6px]">
          <a
            href="https://humane-trollius-aaf.notion.site/Oops-2267949238998078a1f4db2c51db7cac?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            이용약관
          </a>
          <a
            href="https://humane-trollius-aaf.notion.site/Oops-22679492389980c7abdbfc05cca7313f?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            개인정보 처리방침
          </a>
          <p>신고가이드</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
