import Image from "next/image";
import logo from "../../public/logo.png";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Talkative Co."
      className={`w-auto object-contain [mix-blend-mode:multiply] ${className}`}
      priority
    />
  );
}
