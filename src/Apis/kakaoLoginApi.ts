export async function getKakaoLogin(code: string) {
  const res = await fetch(`/api/auth/login/kakao?code=${code}`);
  if (!res.ok) throw new Error('카카오 로그인 API 호출 실패');
  return res.json();
} 