import MainNavbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center ">
      <MainNavbar />
      {children}
    </div>
  );
}
//  mx-auto px-4 sm:px-5 py-4
