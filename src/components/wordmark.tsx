import Image from "next/image";
import logo from "../../public/logo.png";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Talkative Co."
      className={`h-10 w-auto object-contain ${className}`}
      priority
    />
  );
}
