// // import { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Warning from "../assets/icons/warning.svg?react";
// // import MyProfileIcon from "../assets/icons/myprofile.svg?react";
// // import { getMyProfile, patchMyProfile } from "../apis/mypageApi";
// // import { postLogout } from "../apis/auth/authApi";
// // import type { MyProfileRes } from "../types/mypage";

// // export default function MyProfilePage() {
// //   const [profile, setProfile] = useState<MyProfileRes | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [err, setErr] = useState<string | null>(null);
// //   const [loggingOut, setLoggingOut] = useState(false);

// //   // ✅ 변경: 파일 입력 ref & 미리보기 URL 상태
// //   const fileInputRef = useRef<HTMLInputElement | null>(null);
// //   const previewUrlRef = useRef<string | null>(null);
// //   const [uploading, setUploading] = useState(false); // 업로드 진행 상태

// //   // ✅ 변경: 업로드 제한(필요시 조절)
// //   const MAX_BYTES = 10 * 1024 * 1024; // 10MB
// //   const ACCEPT_TYPES = /^(image\/(png|jpe?g|gif|webp))$/i;

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await getMyProfile();
// //         setProfile(data);

// //         //result(=data) 안의 키/값 확인 로그
// //         // console.log("[MyProfile] result object:", data);
// //         // console.log("[MyProfile] result keys:", Object.keys(data as any));
// //         // Object.entries(data as unknown as Record<string, unknown>).forEach(
// //         //   ([k, v]) => {
// //         //     console.log(`key=${k}, type=${typeof v}, value=`, v);
// //         //   }
// //         // );
// //       } catch (e: any) {
// //         console.error("유저 정보 불러오기 실패:", e);
// //         setErr(
// //           e?.response?.data?.message ?? "유저 정보를 불러오지 못했습니다."
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProfile();

// //     // ✅ 변경: 컴포넌트 unmount 시 objectURL 정리
// //     return () => {
// //       if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
// //     };
// //   }, []);
// //   // ✅ 변경: 파일 선택 트리거
// //   const openFilePicker = () => {
// //     fileInputRef.current?.click();
// //   };

// //   // ✅ 변경: 파일 검증 헬퍼
// //   function validateFile(file: File) {
// //     if (!ACCEPT_TYPES.test(file.type)) {
// //       alert("PNG/JPG/GIF/WEBP 형식의 이미지 파일만 업로드할 수 있어요.");
// //       return false;
// //     }
// //     if (file.size > MAX_BYTES) {
// //       alert("이미지 용량이 너무 커요. 최대 10MB까지 업로드할 수 있어요.");
// //       return false;
// //     }
// //     return true;
// //   }

// //   // ✅ 변경: 이미지 선택 시 처리 (미리보기 → 업로드)
// //   const onSelectImage: React.ChangeEventHandler<HTMLInputElement> = async (
// //     e
// //   ) => {
// //     const file = e.target.files?.[0];
// //     // 같은 파일 다시 선택 가능하도록 초기화
// //     e.currentTarget.value = "";
// //     if (!file) return;

// //     if (!validateFile(file)) return;

// //     // 미리보기 즉시 반영
// //     if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
// //     const localUrl = URL.createObjectURL(file);
// //     previewUrlRef.current = localUrl;
// //     setProfile((prev) =>
// //       prev ? { ...prev, profileImageUrl: localUrl } : prev
// //     );

// //     // 서버 업로드
// //     try {
// //       setUploading(true);
// //       const updated = await patchMyProfile({ file }); // data는 API 내부에서 {"userName":null}로 처리
// //       // ✅ 변경: 서버가 result를 안 줄 수도 있으므로 방어처리
// //       if (updated) {
// //         setProfile(updated);
// //       } else {
// //         // ✅ 변경: result가 없으면 최신 프로필을 다시 받아서 반영
// //         const fresh = await getMyProfile();
// //         setProfile(fresh);
// //       }
// //     } catch (e: any) {
// //       console.error("[프로필 이미지 업로드 실패]", {
// //         error: e,
// //         status: e?.response?.status,
// //         data: e?.response?.data,
// //       });
// //       alert(
// //         e?.response?.data?.message ||
// //           e?.message ||
// //           "프로필 이미지 업로드에 실패했습니다."
// //       );
// //       // ✅ 변경: 실패 시에도 기존 프로필이 사라지지 않도록 prev 유지(미리보기는 유지됨)
// //       setProfile((prev) => prev ?? null);
// //     } finally {
// //       setUploading(false);
// //       if (previewUrlRef.current) {
// //         URL.revokeObjectURL(previewUrlRef.current);
// //         previewUrlRef.current = null;
// //       }
// //     }
// //   };

// //   const handleLogout = async () => {
// //     if (loggingOut) return;
// //     setLoggingOut(true);
// //     try {
// //       await postLogout();
// //     } catch (e) {
// //       console.warn("logout 호출 실패, 로컬만 초기화합니다.", e);
// //     } finally {
// //       // 클라이언트 상태 정리
// //       localStorage.removeItem("accessToken");
// //       localStorage.removeItem("refreshToken");
// //       localStorage.removeItem("userId");
// //       setLoggingOut(false);
// //       navigate("/", { replace: true });
// //     }
// //   };

// //   if (loading) return <div className="p-4">불러오는 중...</div>;
// //   if (err) return <div className="p-4 text-red-500">{err}</div>;
// //   if (!profile) return null;

// //   //const nickname = (profile as any).nickname ?? (profile as any).userName ?? "";
// //   const {
// //     userName,
// //     email,
// //     point,
// //     commentReportCount,
// //     postReportCount,
// //     profileImageUrl,
// //   } = profile;

// //   return (
// //     <section className="space-y-6 p-4">
// //       <div className="flex items-center gap-4">
// //         {profileImageUrl ? (
// //           <img
// //             src={profileImageUrl}
// //             alt="profile"
// //             className="h-[100px] w-[100px] rounded-full object-cover"
// //           />
// //         ) : (
// //           <MyProfileIcon className="h-[100px] w-[100px] rounded-full object-cover" />
// //         )}

// //         <div className="space-y-[5px]">
// //           <p className="font-pretendard text-lg font-bold">{userName}</p>
// //           <p className="font-pretendard text-xs text-gray-500">{email}</p>

// //           {/* ✅ 변경: '프로필 이미지 수정' 버튼 + 숨김 input */}
// //           <button
// //             className="inline-flex h-[24px] items-center justify-center rounded-[4px]
// //                        bg-[#262626] px-[8px]
// //                        font-pretendard text-[12px] font-semibold text-[#FFFFFF] disabled:opacity-60"
// //             onClick={openFilePicker}
// //             disabled={uploading}
// //             aria-label="프로필 이미지 수정"
// //           >
// //             {uploading ? "업로드 중..." : "프로필 이미지 수정"}
// //           </button>
// //           <input
// //             ref={fileInputRef}
// //             type="file"
// //             accept="image/*"
// //             capture="environment"
// //             className="hidden"
// //             onChange={onSelectImage}
// //           />
// //         </div>
// //       </div>

// //       <div className="flex items-center justify-center rounded-lg bg-[#B3E378] p-4 text-[#1D1D1D]">
// //         <span className="mr-[6px] font-pretendard text-[12px] font-semibold text-[#4D4D4D]">
// //           내 포인트 :
// //         </span>
// //         <span className="text-[24px] font-semibold text-[#1D1D1D]">
// //           {point} P
// //         </span>
// //       </div>

// //       <div className="space-y-[10px]">
// //         <div className="w-[335px] space-y-2 p-5">
// //           <div className="flex items-center gap-[10px]">
// //             <Warning className="h-5 w-5 shrink-0" />
// //             <p className="text-base font-semibold text-[#1D1D1D]">
// //               댓글 신고 수
// //             </p>
// //           </div>
// //           <p className="text-sm text-[#666666] leading-snug">
// //             {userName}님의 댓글 신고 수가{" "}
// //             <span className="font-bold">{commentReportCount}개</span>{" "}
// //             이상입니다.
// //             <br />
// //             80개 이상이 될 경우 계정이 정지될 수 있습니다.
// //           </p>
// //         </div>

// //         {/* 게시물 신고 수 */}
// //         <div className="w-[335px] space-y-2 p-5">
// //           <div className="flex items-center gap-[10px]">
// //             <Warning className="h-5 w-5 shrink-0" />
// //             <p className="text-base font-semibold text-[#1D1D1D]">
// //               게시물 신고 수
// //             </p>
// //           </div>
// //           <p className="text-sm text-[#666666] leading-snug">
// //             {userName}님의 게시물 신고 수가{" "}
// //             <span className="font-bold">{postReportCount}개</span> 이상입니다.
// //             <br />
// //             80개 이상이 될 경우 계정이 정지될 수 있습니다.
// //           </p>
// //         </div>
// //       </div>

// //       <div className="flex justify-center">
// //         <button
// //           onClick={handleLogout}
// //           disabled={loggingOut}
// //           className="h-[30px] w-[84px] rounded-[20px] border border-[#B3B3B3] px-[13px] py-[3px] text-[14px] font-semibold text-[#1D1D1D] flex items-center justify-center disabled:opacity-60"
// //         >
// //           {loggingOut ? "로그아웃 중..." : "로그아웃"}
// //         </button>
// //       </div>
// //     </section>
// //   );
// // }

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Warning from "../assets/icons/warning.svg?react";
// import MyProfileIcon from "../assets/icons/myprofile.svg?react";
// import { getMyProfile, patchMyProfile } from "../apis/mypageApi";
// import { postLogout } from "../apis/auth/authApi";
// import type { MyProfileRes } from "../types/mypage";

// export default function MyProfilePage() {
//   const [profile, setProfile] = useState<MyProfileRes | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // 파일 입력 & 미리보기
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const previewUrlRef = useRef<string | null>(null);
//   // 업로드 상태
//   const [uploading, setUploading] = useState(false);

//   // [NEW] 업로드 중인지 최신 값을 읽기 위한 ref (클로저 문제 방지)
//   const uploadingRef = useRef(false);
//   useEffect(() => {
//     uploadingRef.current = uploading;
//   }, [uploading]);

//   // [NEW] 현재 진행 중인 업로드의 로컬 미리보기 URL을 추적(레이스 방지용)
//   const inflightPreviewRef = useRef<string | null>(null);

//   // 업로드 제한
//   const MAX_BYTES = 10 * 1024 * 1024; // 10MB
//   const ACCEPT_TYPES = /^(image\/(png|jpe?g|gif|webp))$/i;

//   const navigate = useNavigate();

//   useEffect(() => {
//     let cancelled = false; // [NEW] 언마운트 안전장치

//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const data = await getMyProfile();
//         // [NEW] 업로드 중이면, 도착한 오래된 GET 응답은 무시
//         if (uploadingRef.current || cancelled) return;

//         setProfile(data);
//       } catch (e: any) {
//         console.error("유저 정보 불러오기 실패:", e);
//         setErr(
//           e?.response?.data?.message ?? "유저 정보를 불러오지 못했습니다."
//         );
//       } finally {
//         if (!cancelled) setLoading(false);
//         //setLoading(false);
//       }
//     };

//     fetchProfile();

//     return () => {
//       cancelled = true;
//       // 컴포넌트 unmount 시 objectURL 정리
//       if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
//     };
//   }, []);

//   const openFilePicker = () => {
//     // [CHANGED] 업로드 중에는 다시 열지 않기
//     if (uploading) return;
//     fileInputRef.current?.click();
//   };

//   function validateFile(file: File) {
//     if (!ACCEPT_TYPES.test(file.type)) {
//       alert("PNG/JPG/GIF/WEBP 형식의 이미지 파일만 업로드할 수 있어요.");
//       return false;
//     }
//     if (file.size > MAX_BYTES) {
//       alert("이미지 용량이 너무 커요. 최대 10MB까지 업로드할 수 있어요.");
//       return false;
//     }
//     return true;
//   }

//   // 이미지 선택 시 처리 (미리보기 → 업로드)
//   const onSelectImage: React.ChangeEventHandler<HTMLInputElement> = async (
//     e
//   ) => {
//     const file = e.target.files?.[0];
//     // 같은 파일 다시 선택 가능하도록 초기화
//     e.currentTarget.value = "";
//     if (!file) return;

//     if (!validateFile(file)) return;

//     // [CHANGED] 기존 프리뷰 URL 정리 → 새 프리뷰 발급
//     if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
//     const localUrl = URL.createObjectURL(file);
//     previewUrlRef.current = localUrl;

//     // [NEW] 이번 업로드 작업의 기준값 저장(서버 응답이 돌아왔을 때 동일 업로드인지 확인)
//     inflightPreviewRef.current = localUrl;

//     // 즉시 미리보기 반영(낙관적 UI)
//     setProfile((prev) =>
//       prev ? { ...prev, profileImageUrl: localUrl } : prev
//     );

//     try {
//       setUploading(true);
//       // [CHANGED] patchMyProfile는 이제 최신 프로필(정규화/캐시버스트 적용)을 반환하거나 null
//       const updated = await patchMyProfile({ file });

//       // [NEW] 다른 파일로 교체 업로드가 이미 시작됐다면(레이스) 이 응답은 무시
//       if (inflightPreviewRef.current !== localUrl) {
//         return;
//       }

//       if (updated) {
//         setProfile(updated);
//       } else {
//         // 서버가 결과를 안 주는 경우 재조회로 동기화
//         const fresh = await getMyProfile();
//         setProfile(fresh);
//       }
//     } catch (e: any) {
//       console.error("[프로필 이미지 업로드 실패]", {
//         error: e,
//         status: e?.response?.status,
//         data: e?.response?.data,
//       });
//       alert(
//         e?.response?.data?.message ||
//           e?.message ||
//           "프로필 이미지 업로드에 실패했습니다."
//       );
//       // 실패 시에도 기존 프로필은 유지
//       setProfile((prev) => prev ?? null);
//     } finally {
//       setUploading(false);

//       // [CHANGED] 이번 업로드에 대응하는 프리뷰 URL만 정리
//       if (previewUrlRef.current === localUrl) {
//         URL.revokeObjectURL(localUrl);
//         previewUrlRef.current = null;
//       }
//       // [NEW] 인플라이트 마커 해제
//       if (inflightPreviewRef.current === localUrl) {
//         inflightPreviewRef.current = null;
//       }
//     }
//   };

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     try {
//       await postLogout();
//     } catch (e) {
//       console.warn("logout 호출 실패, 로컬만 초기화합니다.", e);
//     } finally {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("userId");
//       setLoggingOut(false);
//       navigate("/", { replace: true });
//     }
//   };

//   if (loading) return <div className="p-4">불러오는 중...</div>;
//   if (err) return <div className="p-4 text-red-500">{err}</div>;
//   if (!profile) return null;

//   const {
//     userName,
//     email,
//     point,
//     commentReportCount,
//     postReportCount,
//     profileImageUrl,
//   } = profile;

//   return (
//     <section className="space-y-6 p-4">
//       <div className="flex items-center gap-4">
//         {profileImageUrl ? (
//           <img
//             src={profileImageUrl}
//             alt="profile"
//             className="h-[100px] w-[100px] rounded-full object-cover"
//           />
//         ) : (
//           <MyProfileIcon className="h-[100px] w-[100px] rounded-full object-cover" />
//         )}

//         <div className="space-y-[5px]">
//           <p className="font-pretendard text-lg font-bold">{userName}</p>
//           <p className="font-pretendard text-xs text-gray-500">{email}</p>

//           {/* '프로필 이미지 수정' 버튼 + 숨김 input */}
//           <button
//             className="inline-flex h-[24px] items-center justify-center rounded-[4px]
//                        bg-[#262626] px-[8px]
//                        font-pretendard text-[12px] font-semibold text-[#FFFFFF] disabled:opacity-60"
//             onClick={openFilePicker}
//             disabled={uploading} // [CHANGED] 업로드 중에는 비활성화
//             aria-label="프로필 이미지 수정"
//           >
//             {uploading ? "업로드 중..." : "프로필 이미지 수정"}
//           </button>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             // capture="environment"  // [NEW] 모바일 카메라 강제 노출이 필요 없다면 주석 처리 권장
//             className="hidden"
//             onChange={onSelectImage}
//             disabled={uploading} // [NEW] 업로드 중 연속 트리거 방지
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-center rounded-lg bg-[#B3E378] p-4 text-[#1D1D1D]">
//         <span className="mr-[6px] font-pretendard text-[12px] font-semibold text-[#4D4D4D]">
//           내 포인트 :
//         </span>
//         <span className="text-[24px] font-semibold text-[#1D1D1D]">
//           {point} P
//         </span>
//       </div>

//       <div className="space-y-[10px]">
//         <div className="w-[335px] space-y-2 p-5">
//           <div className="flex items-center gap-[10px]">
//             <Warning className="h-5 w-5 shrink-0" />
//             <p className="text-base font-semibold text-[#1D1D1D]">
//               댓글 신고 수
//             </p>
//           </div>
//           <p className="text-sm text-[#666666] leading-snug">
//             {userName}님의 댓글 신고 수가{" "}
//             <span className="font-bold">{commentReportCount}개</span>{" "}
//             이상입니다.
//             <br />
//             80개 이상이 될 경우 계정이 정지될 수 있습니다.
//           </p>
//         </div>

//         <div className="w-[335px] space-y-2 p-5">
//           <div className="flex items-center gap-[10px]">
//             <Warning className="h-5 w-5 shrink-0" />
//             <p className="text-base font-semibold text-[#1D1D1D]">
//               게시물 신고 수
//             </p>
//           </div>
//           <p className="text-sm text-[#666666] leading-snug">
//             {userName}님의 게시물 신고 수가{" "}
//             <span className="font-bold">{postReportCount}개</span> 이상입니다.
//             <br />
//             80개 이상이 될 경우 계정이 정지될 수 있습니다.
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <button
//           onClick={handleLogout}
//           disabled={loggingOut}
//           className="h-[30px] w-[84px] rounded-[20px] border border-[#B3B3B3] px-[13px] py-[3px] text-[14px] font-semibold text-[#1D1D1D] flex items-center justify-center disabled:opacity-60"
//         >
//           {loggingOut ? "로그아웃 중..." : "로그아웃"}
//         </button>
//       </div>
//     </section>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Warning from "../assets/icons/warning.svg?react";
// import MyProfileIcon from "../assets/icons/myprofile.svg?react";
// import { getMyProfile, patchMyProfile } from "../apis/mypageApi";
// import { postLogout } from "../apis/auth/authApi";
// import type { MyProfileRes } from "../types/mypage";

// export default function MyProfilePage() {
//   const [profile, setProfile] = useState<MyProfileRes | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const [loggingOut, setLoggingOut] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const previewUrlRef = useRef<string | null>(null);
//   const [uploading, setUploading] = useState(false);

//   // [NEW] 업로드/계정 레이스 방지용 ref들
//   const uploadingRef = useRef(false);
//   useEffect(() => {
//     uploadingRef.current = uploading;
//   }, [uploading]);
//   const inflightPreviewRef = useRef<string | null>(null);

//   // [NEW] 현재 로그인 유저 ID (localStorage 기준)
//   const [userId, setUserId] = useState<string | null>(
//     (typeof localStorage !== "undefined" && localStorage.getItem("userId")) ||
//       null
//   );

//   const navigate = useNavigate();

//   // 최초 + userId 바뀔 때마다 프로필 로드  // [CHANGED]
//   useEffect(() => {
//     let cancelled = false;

//     async function fetchProfile() {
//       try {
//         setLoading(true);
//         const data = await getMyProfile();

//         // 업로드 중이면 오래된 GET 응답은 무시
//         if (uploadingRef.current || cancelled) return;

//         setProfile(data);
//       } catch (e: any) {
//         if (cancelled) return;
//         console.error("유저 정보 불러오기 실패:", e);
//         setErr(
//           e?.response?.data?.message ?? "유저 정보를 불러오지 못했습니다."
//         );
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     fetchProfile();

//     return () => {
//       cancelled = true;
//     };
//   }, [userId]); // ← 계정이 바뀌면 항상 재조회

//   // [NEW] 렌더 때마다 userId 변화 감지(로그인/전환 시)
//   useEffect(() => {
//     const now = localStorage.getItem("userId") || null;
//     if (now !== userId) {
//       // 계정 변경 → 프리뷰/상태 정리 + userId 갱신 → 위 useEffect가 재조회
//       if (previewUrlRef.current) {
//         URL.revokeObjectURL(previewUrlRef.current);
//         previewUrlRef.current = null;
//       }
//       inflightPreviewRef.current = null;
//       setUploading(false);
//       setProfile(null);
//       setUserId(now); // ← 이게 트리거
//     }
//   });

//   // 컴포넌트 언마운트 시 프리뷰 정리
//   useEffect(() => {
//     return () => {
//       if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
//       inflightPreviewRef.current = null;
//     };
//   }, []);

//   const openFilePicker = () => {
//     if (uploading) return;
//     fileInputRef.current?.click();
//   };

//   function validateFile(file: File) {
//     if (!/^(image\/(png|jpe?g|gif|webp))$/i.test(file.type)) {
//       alert("PNG/JPG/GIF/WEBP 형식의 이미지 파일만 업로드할 수 있어요.");
//       return false;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       alert("이미지 용량이 너무 커요. 최대 10MB까지 업로드할 수 있어요.");
//       return false;
//     }
//     return true;
//   }

//   const onSelectImage: React.ChangeEventHandler<HTMLInputElement> = async (
//     e
//   ) => {
//     const file = e.target.files?.[0];
//     e.currentTarget.value = "";
//     if (!file) return;
//     if (!validateFile(file)) return;

//     // 즉시 미리보기(현재 계정에만)
//     if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
//     const localUrl = URL.createObjectURL(file);
//     previewUrlRef.current = localUrl;
//     inflightPreviewRef.current = localUrl;

//     setProfile((prev) =>
//       prev ? { ...prev, profileImageUrl: localUrl } : prev
//     );

//     try {
//       setUploading(true);
//       const myUserIdAtStart = userId; // [NEW] 시작 시 계정 스냅샷
//       const updated = await patchMyProfile({ file });

//       // [NEW] 다른 파일로 교체/계정 전환 등 레이스 차단
//       if (inflightPreviewRef.current !== localUrl) return;
//       if (myUserIdAtStart !== (localStorage.getItem("userId") || null)) return;

//       if (updated) {
//         setProfile(updated);
//       } else {
//         const fresh = await getMyProfile();
//         setProfile(fresh);
//       }
//     } catch (e: any) {
//       console.error("[프로필 이미지 업로드 실패]", {
//         error: e,
//         status: e?.response?.status,
//         data: e?.response?.data,
//       });
//       alert(
//         e?.response?.data?.message ||
//           e?.message ||
//           "프로필 이미지 업로드에 실패했습니다."
//       );
//       setProfile((prev) => prev ?? null);
//     } finally {
//       setUploading(false);
//       if (previewUrlRef.current === localUrl) {
//         URL.revokeObjectURL(localUrl);
//         previewUrlRef.current = null;
//       }
//       if (inflightPreviewRef.current === localUrl) {
//         inflightPreviewRef.current = null;
//       }
//     }
//   };

//   const handleLogout = async () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     try {
//       await postLogout();
//     } catch (e) {
//       console.warn("logout 호출 실패, 로컬만 초기화합니다.", e);
//     } finally {
//       if (previewUrlRef.current) {
//         URL.revokeObjectURL(previewUrlRef.current);
//         previewUrlRef.current = null;
//       }
//       inflightPreviewRef.current = null;
//       setUploading(false);
//       setProfile(null);

//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("userId");

//       setUserId(null); // [CHANGED] 로그아웃 후 재조회 방지
//       setLoggingOut(false);
//       navigate("/", { replace: true });
//     }
//   };

//   if (loading) return <div className="p-4">불러오는 중...</div>;
//   if (err) return <div className="p-4 text-red-500">{err}</div>;
//   if (!profile) return null;

//   const {
//     userName,
//     email,
//     point,
//     commentReportCount,
//     postReportCount,
//     profileImageUrl,
//   } = profile;

//   // [CHANGED] 안전한 src: 업로드 중이고 그 프리뷰일 때만 blob/data 허용
//   const allowPreview =
//     uploading &&
//     !!profileImageUrl &&
//     profileImageUrl === inflightPreviewRef.current &&
//     (profileImageUrl.startsWith("blob:") ||
//       profileImageUrl.startsWith("data:"));

//   const safeSrc = allowPreview
//     ? profileImageUrl
//     : profileImageUrl &&
//         (profileImageUrl.startsWith("http://") ||
//           profileImageUrl.startsWith("https://") ||
//           profileImageUrl.startsWith("/"))
//       ? profileImageUrl
//       : null;

//   return (
//     <section className="space-y-6 p-4">
//       <div className="flex items-center gap-4">
//         {safeSrc ? (
//           <img
//             src={safeSrc}
//             alt="profile"
//             className="h-[100px] w-[100px] rounded-full object-cover"
//           />
//         ) : (
//           <MyProfileIcon className="h-[100px] w-[100px] rounded-full object-cover" />
//         )}

//         <div className="space-y-[5px]">
//           <p className="font-pretendard text-lg font-bold">{userName}</p>
//           <p className="font-pretendard text-xs text-gray-500">{email}</p>

//           <button
//             className="inline-flex h-[24px] items-center justify-center rounded-[4px]
//                        bg-[#262626] px-[8px]
//                        font-pretendard text-[12px] font-semibold text-[#FFFFFF] disabled:opacity-60"
//             onClick={openFilePicker}
//             disabled={uploading}
//             aria-label="프로필 이미지 수정"
//           >
//             {uploading ? "업로드 중..." : "프로필 이미지 수정"}
//           </button>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={onSelectImage}
//             disabled={uploading}
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-center rounded-lg bg-[#B3E378] p-4 text-[#1D1D1D]">
//         <span className="mr-[6px] font-pretendard text-[12px] font-semibold text-[#4D4D4D]">
//           내 포인트 :
//         </span>
//         <span className="text-[24px] font-semibold text-[#1D1D1D]">
//           {point} P
//         </span>
//       </div>

//       <div className="space-y-[10px]">
//         <div className="w-[335px] space-y-2 p-5">
//           <div className="flex items-center gap-[10px]">
//             <Warning className="h-5 w-5 shrink-0" />
//             <p className="text-base font-semibold text-[#1D1D1D]">
//               댓글 신고 수
//             </p>
//           </div>
//           <p className="text-sm text-[#666666] leading-snug">
//             {userName}님의 댓글 신고 수가{" "}
//             <span className="font-bold">{commentReportCount}개</span>{" "}
//             이상입니다.
//             <br />
//             80개 이상이 될 경우 계정이 정지될 수 있습니다.
//           </p>
//         </div>

//         <div className="w-[335px] space-y-2 p-5">
//           <div className="flex items-center gap-[10px]">
//             <Warning className="h-5 w-5 shrink-0" />
//             <p className="text-base font-semibold text-[#1D1D1D]">
//               게시물 신고 수
//             </p>
//           </div>
//           <p className="text-sm text-[#666666] leading-snug">
//             {userName}님의 게시물 신고 수가{" "}
//             <span className="font-bold">{postReportCount}개</span> 이상입니다.
//             <br />
//             80개 이상이 될 경우 계정이 정지될 수 있습니다.
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <button
//           onClick={handleLogout}
//           disabled={loggingOut}
//           className="h-[30px] w-[84px] rounded-[20px] border border-[#B3B3B3] px-[13px] py-[3px] text-[14px] font-semibold text-[#1D1D1D] flex items-center justify-center disabled:opacity-60"
//         >
//           {loggingOut ? "로그아웃 중..." : "로그아웃"}
//         </button>
//       </div>
//     </section>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Warning from "../assets/icons/warning.svg?react";
import MyProfileIcon from "../assets/icons/myprofile.svg?react";
import { getMyProfile, patchMyProfile } from "../apis/mypageApi";
import { postLogout } from "../apis/auth/authApi";
import type { MyProfileRes } from "../types/mypage";

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

  useEffect(() => {
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
  }, [userId]);

  useEffect(() => {
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
  }, [location.key]);

  useEffect(() => {
    const onShow = () => {
      if (uploadingRef.current) return;
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
  }, []);

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
      await postLogout();
    } catch (e) {
      console.warn("logout 호출 실패, 로컬만 초기화합니다.", e);
    } finally {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      inflightPreviewRef.current = null;
      setUploading(false);
      setProfile(null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      setUserId(null);
      setLoggingOut(false);
      navigate("/", { replace: true });
    }
  };

  // ---------------- 렌더 ----------------
  if (loading) return <div className="p-4">불러오는 중...</div>;
  if (err) return <div className="p-4 text-red-500">{err}</div>;
  if (!profile) return null;

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
