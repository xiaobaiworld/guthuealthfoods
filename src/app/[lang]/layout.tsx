import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} />
      <main className="page-shell">{children}</main>
      <Footer lang={lang as "en" | "zh"} />
    </>
  );
}
