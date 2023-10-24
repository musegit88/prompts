import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
interface HeaderProps {
  title: string;
  titleBottom: string;
  description: string;
  gradient: string;
}
const inter = Inter({ subsets: ["latin"] });
const Header: React.FC<HeaderProps> = ({
  title,
  description,
  gradient,
  titleBottom,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-[inter] text-4xl font-medium sm:font-extrabold leading-[1.15] text-black dark:text-white mt-4 sm:text-5xl md:text-6xl lg:text-7xl text-center">
        {title}
        <br />
        <span className={cn("text-center", gradient)}>{titleBottom}</span>
      </h1>
      <p className="mt-4 text-xs sm:mt-8 text-center max-w-2xl  text-muted-foreground sm:text-sm ">
        {description}
      </p>
    </div>
  );
};
export default Header;
