

interface LandingPagePresentationProps {
  onGoToUpload: () => void;
}

const LandingPagePresentation = ({ onGoToUpload }: LandingPagePresentationProps) => {
  return (
    <div style={{ padding: 24 }}>
      <h1>초기 화면</h1>
      <button onClick={onGoToUpload} style={{ fontSize: 18, padding: 12, margin: 12 }}>
        공구 등록하러 가기
      </button>
      {/* 나머지 UI는 추후 구현 */}
    </div>
  );
};

export default LandingPagePresentation; 