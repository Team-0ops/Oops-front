import { useNavigate } from "react-router-dom";
import Banner from "../../assets/icons/luck-banner.svg?react";
const LuckBanner = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/lucky-draw`)} className="w-full h-full">
      <Banner />
    </div>
  );
};

export default LuckBanner;
