import React, { useEffect, useState } from 'react';

const texts = [
  ' "DAGONG"은 함께 사서 더 저렴하게 구매하는 플랫폼입니다!',
  '믿을 수 있는 이웃과 공동구매를 시작해보세요.',
  '"DAGONG"과 함께라면 누구나 쉽게 공구를 열고 참여할 수 있어요!'
];

export const FadeTextSlider = () => {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setFade(false), 1800);
    const next = setTimeout(() => {
      setIdx((prev) => (prev + 1) % texts.length);
      setFade(true);
    }, 2000);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [idx]);

  return (
    <div style={{ minHeight: 40, fontSize: 20, fontWeight: 600, color: '#ff914d', textAlign: 'center', transition: 'opacity 0.4s', opacity: fade ? 1 : 0 }}>
      {texts[idx]}
    </div>
  );
}; 