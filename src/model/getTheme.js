// import { useLogin } from "../Login/LoginProvider";

// export function useGetTheme() {
//   console.log("useGetTheme");

//   const { loginInfo } = useLogin();
//   const theme = loginInfo.companyName;
//   console.log(theme);
//   let rgbColor;
//   if (theme === "orange") {
//     rgbColor = "rgb(255, 134, 48)";
//   } else if (theme === "green") {
//     rgbColor = "rgb(18, 204, 108)";
//   } else if (theme === "yellow") {
//     rgbColor = "rgb(254, 213, 51)";
//   } else if (theme === "pink") {
//     rgbColor = "rgb(255, 82, 82)";
//   } else if (theme === "pupple") {
//     rgbColor = "rgb(126, 58, 243)";
//   } else {
//     rgbColor = "rgb(48, 150, 255)";
//   }

//   return rgbColor;
// }

// export function useIncreaseBrightness(percent) {
//   console.log("useIncreaseBrightness");
//   const rgbColor = useGetTheme();
//   const colors = rgbColor.match(/\d+/g); // RGB 값 추출 후 배열에 저장
//   const r = parseInt(colors[0]);
//   const g = parseInt(colors[1]);
//   const b = parseInt(colors[2]);

//   // 밝기 조절
//   const newR = Math.min(255, r + (255 - r) * (percent / 100));
//   const newG = Math.min(255, g + (255 - g) * (percent / 100));
//   const newB = Math.min(255, b + (255 - b) * (percent / 100));

//   return `rgb(${newR},${newG},${newB})`;
// }

// export function useTheme(percent) {
//   const rgbColor = useGetTheme();

//   const colors = rgbColor.match(/\d+/g);

//   const r = parseInt(colors[0]);
//   const g = parseInt(colors[1]);
//   const b = parseInt(colors[2]);

//   // 밝기 조절
//   const newR = Math.min(255, r + (255 - r) * (percent / 100));
//   const newG = Math.min(255, g + (255 - g) * (percent / 100));
//   const newB = Math.min(255, b + (255 - b) * (percent / 100));

//   return `rgb(${newR},${newG},${newB})`;
// }
