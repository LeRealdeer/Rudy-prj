import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "본격 루디 자랑 사이트👑",
  description: "우리집 막내 루디의 28가지 매력 | 10월 1일생 | 쥐돌이 러버",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}