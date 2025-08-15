import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Warning from "../assets/icons/warning.svg?react";
import MyProfileIcon from "../assets/icons/myprofile.svg?react";
import { getMyProfile, patchMyProfile } from "../apis/mypageApi";
//import { postLogout } from "../apis/auth/authApi";
import type { MyProfileRes } from "../types/mypage";
import { useAuth } from "../context/AuthContext";

function makeImgCandidates(raw?: string | null): string[] {
  if (!raw) return [];
  if (/^(blob:|data:)/i.test(raw)) return [raw];
  if (/^https?:\/\//i.test(raw)) return [raw];
  const path = raw.startsWith("/") ? raw.slice(1) : raw;
  return Array.from(
    new Set([`${location.origin}/${path}`, `${location.origin}/api/${path}`])
  );
}

export default function MyProfilePage() {
  const [profile, setProfile] = useState<MyProfileRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadingRef = useRef(false);
  useEffect(() => {
    uploadingRef.current = uploading;
  }, [uploading]);
  const inflightPreviewRef = useRef<string | null>(null);

  const [userId, setUserId] = useState<string | null>(
    (typeof localStorage !== "undefined" && localStorage.getItem("userId")) ||
      null
  );

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const imgCandsRef = useRef<string[]>([]);
  const imgIdxRef = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, logout } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      setErr(null);
      setProfile(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        if (uploadingRef.current || cancelled) return;
        setProfile(data);
      } catch (e: any) {
        if (cancelled) return;
        console.error("유저 정보 불러오기 실패:", e);
        setErr(
          e?.response?.data?.message ?? "유저 정보를 불러오지 못했습니다."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [accessToken, userId]);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await getMyProfile();
        if (!uploadingRef.current && !cancelled) setProfile(data);
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [accessToken, location.key]);

  useEffect(() => {
    const onShow = () => {
      if (uploadingRef.current || !accessToken) return;
      getMyProfile()
        .then(setProfile)
        .catch(() => {});
    };
    window.addEventListener("pageshow", onShow);
    document.addEventListener("visibilitychange", onShow);
    return () => {
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("visibilitychange", onShow);
    };
  }, [accessToken]);

  useEffect(() => {
    const now = localStorage.getItem("userId") || null;
    if (now !== userId) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      inflightPreviewRef.current = null;
      setUploading(false);
      setProfile(null);
      setUserId(now);
    }
  });

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      inflightPreviewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const url = profile?.profileImageUrl || null;

    // [FIX] blob/data → 후보 변환 금지, 그대로 사용
    if (url && /^(blob:|data:)/i.test(url)) {
      imgCandsRef.current = [url];
      imgIdxRef.current = 0;
      setImgSrc(url);
      return;
    }

    const cands = makeImgCandidates(url);
    imgCandsRef.current = cands;
    imgIdxRef.current = 0;
    setImgSrc(cands[0] ?? null);
  }, [profile?.profileImageUrl]);

  const openFilePicker = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  function validateFile(file: File) {
    if (!/^(image\/(png|jpe?g|gif|webp))$/i.test(file.type)) {
      alert("PNG/JPG/GIF/WEBP 형식의 이미지 파일만 업로드할 수 있어요.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("이미지 용량이 너무 커요. 최대 10MB까지 업로드할 수 있어요.");
      return false;
    }
    return true;
  }

  const onSelectImage: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = e.target.files?.[0];
    e.currentTarget.value = "";
    if (!file) return;
    if (!validateFile(file)) return;

    // 즉시 미리보기
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const localUrl = URL.createObjectURL(file);
    previewUrlRef.current = localUrl;
    inflightPreviewRef.current = localUrl;

    setProfile((prev) =>
      prev ? { ...prev, profileImageUrl: localUrl } : prev
    );

    try {
      setUploading(true);
      const myUserIdAtStart = userId;
      const updated = await patchMyProfile({ file });

      // 레이스 차단
      if (inflightPreviewRef.current !== localUrl) return;
      if (myUserIdAtStart !== (localStorage.getItem("userId") || null)) return;

      if (updated) {
        setProfile(updated);
      } else {
        const fresh = await getMyProfile();
        setProfile(fresh);
      }
    } catch (e: any) {
      console.error("[프로필 이미지 업로드 실패]", {
        error: e,
        status: e?.response?.status,
        data: e?.response?.data,
      });
      alert(
        e?.response?.data?.message ||
          e?.message ||
          "프로필 이미지 업로드에 실패했습니다."
      );
      setProfile((prev) => prev ?? null);
    } finally {
      setUploading(false);
      if (previewUrlRef.current === localUrl) {
        URL.revokeObjectURL(localUrl);
        previewUrlRef.current = null;
      }
      if (inflightPreviewRef.current === localUrl) {
        inflightPreviewRef.current = null;
      }
    }
  };

  const handleImgError = () => {
    const next = imgIdxRef.current + 1;
    if (next < imgCandsRef.current.length) {
      imgIdxRef.current = next;
      setImgSrc(imgCandsRef.current[next]);
    } else {
      setImgSrc(null);
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  // ---------------- 렌더 ----------------
  if (!accessToken) return null;
  if (loading) return <div className="p-4">불러오는 중...</div>;
  if (err) return <div className="p-4 text-red-500">{err}</div>;
  if (!accessToken || !profile) return null;

  const { userName, email, point, commentReportCount, postReportCount } =
    profile;

  return (
    <section className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        {imgSrc ? (
          <img
            key={imgSrc} // 강제 리렌더
            src={imgSrc}
            onError={handleImgError} // 경로 폴백
            alt="profile"
            className="h-[100px] w-[100px] rounded-full object-cover"
          />
        ) : (
          <MyProfileIcon className="h-[100px] w-[100px] rounded-full object-cover" />
        )}

        <div className="space-y-[5px]">
          <p className="font-pretendard text-lg font-bold">{userName}</p>
          <p className="font-pretendard text-xs text-gray-500">{email}</p>

          <button
            className="inline-flex h-[24px] items-center justify-center rounded-[4px]
                       bg-[#262626] px-[8px]
                       font-pretendard text-[12px] font-semibold text-[#FFFFFF] disabled:opacity-60"
            onClick={openFilePicker}
            disabled={uploading}
            aria-label="프로필 이미지 수정"
          >
            {uploading ? "업로드 중..." : "프로필 이미지 수정"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onSelectImage}
            disabled={uploading}
          />
        </div>
      </div>

      <div className="flex items-center justify-center rounded-lg bg-[#B3E378] p-4 text-[#1D1D1D]">
        <span className="mr-[6px] font-pretendard text-[12px] font-semibold text-[#4D4D4D]">
          내 포인트 :
        </span>
        <span className="text-[24px] font-semibold text-[#1D1D1D]">
          {point} P
        </span>
      </div>

      <div className="space-y-[10px]">
        <div className="w-[335px] space-y-2 p-5">
          <div className="flex items-center gap-[10px]">
            <Warning className="h-5 w-5 shrink-0" />
            <p className="text-base font-semibold text-[#1D1D1D]">
              댓글 신고 수
            </p>
          </div>
          <p className="text-sm text-[#666666] leading-snug">
            {userName}님의 댓글 신고 수가{" "}
            <span className="font-bold">{commentReportCount}개</span>{" "}
            이상입니다.
            <br />
            80개 이상이 될 경우 계정이 정지될 수 있습니다.
          </p>
        </div>

        <div className="w-[335px] space-y-2 p-5">
          <div className="flex items-center gap-[10px]">
            <Warning className="h-5 w-5 shrink-0" />
            <p className="text-base font-semibold text-[#1D1D1D]">
              게시물 신고 수
            </p>
          </div>
          <p className="text-sm text-[#666666] leading-snug">
            {userName}님의 게시물 신고 수가{" "}
            <span className="font-bold">{postReportCount}개</span> 이상입니다.
            <br />
            80개 이상이 될 경우 계정이 정지될 수 있습니다.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="h-[30px] w-[84px] rounded-[20px] border border-[#B3B3B3] px-[13px] py-[3px] text-[14px] font-semibold text-[#1D1D1D] flex items-center justify-center disabled:opacity-60"
        >
          {loggingOut ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
    </section>
  );
}
