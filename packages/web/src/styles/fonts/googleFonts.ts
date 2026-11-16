import localFont from "next/font/local";

export const pretendard = localFont({
  src: "./local/PretendardVariable.woff2",
  variable: "--next-font-family-pretendard",
});

export const raleway = localFont({
  src: "./local/RalewayVariable.woff2",
  weight: "100 900", // variable font weight range
  variable: "--next-font-family-raleway",
});

export const nanumSquare = localFont({
  src: "./local/NanumSquare-ExtraBold.woff2",
  variable: "--next-font-family-nanum-square",
});
