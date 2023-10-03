// 작성자: 김진
// 테마 색상을 받아 밝기를 조절하여 또 다른 색상(ex: label color)을 만들어주는 함수

// 사용예시
// 예시: 현재 RGB 색상에서 밝기를 70% 높임
// const originalColor = "rgb(48, 150, 255)"; // 기존 색상
// const brightenedColor = increaseBrightness(originalColor, 70); // 새로운 색상

// console.log(brightenedColor); // "rgb(183, 210, 255)"

export default function increaseBrightness(rgbColor, percent) {
  const colors = rgbColor.match(/\d+/g); // RGB 값 추출 후 배열에 저장
  const r = parseInt(colors[0]);
  const g = parseInt(colors[1]);
  const b = parseInt(colors[2]);

  // 밝기 조절
  const newR = Math.min(255, r + (255 - r) * (percent / 100));
  const newG = Math.min(255, g + (255 - g) * (percent / 100));
  const newB = Math.min(255, b + (255 - b) * (percent / 100));

  return `rgb(${newR},${newG},${newB})`;
}
