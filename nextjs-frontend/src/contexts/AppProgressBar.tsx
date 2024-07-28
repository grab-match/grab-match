"use client";

import NextTopLoader from "nextjs-toploader";

const AppProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader color="#10b981" showSpinner={false} />
      {children}
    </>
  );
};

export default AppProgressBar;
