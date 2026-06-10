export default function ThemesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html style={{ overflow: "auto", height: "auto" }}>
      <body style={{ overflow: "auto", height: "auto" }}>
        {children}
      </body>
    </html>
  );
}
