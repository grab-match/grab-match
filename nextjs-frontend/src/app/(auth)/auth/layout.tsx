"use client";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-teal-600 to-teal-950">
      {children}
    </div>
  );
}
