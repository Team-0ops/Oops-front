import { useNavigate } from "react-router-dom";
import LeftArrow from "../assets/icons/left-point.svg?react";
import Button from "../components/common/Button";
import rawTerms from "../assets/terms/terms.md?raw";

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-dvh w-full flex-col items-center bg-[#FFFBF8]">
      <div className="mt-[62px] flex w-[335px] items-center gap-[10px]">
        <button type="button" onClick={() => navigate(-1)}>
          <LeftArrow className="h-[18px] w-[18px]" />
        </button>
        <h2 className="text-[20px] font-semibold text-[#1D1D1D]">
          Oops! 이용약관
        </h2>
      </div>

      <div className="mt-[18px] flex w-[335px] flex-col gap-[18px]">
        <div className="h-[600px] overflow-y-auto p-[12px] text-[12px] whitespace-pre-line leading-[18px] text-[#4D4D4D]">
          {rawTerms}
        </div>

        <Button variant="primary" size="lg" onClick={() => navigate(-1)}>
          동의 후 돌아가기
        </Button>
      </div>
    </section>
  );
}
