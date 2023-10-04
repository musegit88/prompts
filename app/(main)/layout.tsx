import Footer from "@/components/footer";
import Navbar from "@/components/landingnavbar";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-5 py-4 ">
      <Navbar />
      {children}
    </div>
  );
}
