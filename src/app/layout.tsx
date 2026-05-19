import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Izak Studio",
  description: "Creative Developer Portfolio"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#050505",
          color: "white",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <Navbar />
        <main
          style={{
            padding: "48px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}