import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiFrontendmentor } from "react-icons/si";

function Footer() {
  return (
    <footer>
      <div className="w-full grid place-content-center gap-3 p-5">
        <p className="text-gray-500">
          Made by{" "}
          <Link
            href="https://engrjvramos.github.io"
            className="hover:text-white font-medium transition duration-300"
          >
            Jose Ramos
          </Link>
        </p>
        <div className="text-gray-500 flex items-center justify-center gap-3">
          <Link href="https://github.com/engrjvramos">
            <AiFillGithub className="h-6 w-6 hover:text-white transition duration-300" />
          </Link>
          <Link href="https://www.linkedin.com/in/jose-roberto-ramos-7702b1131/">
            <AiFillLinkedin className="h-6 w-6 hover:text-white transition duration-300" />
          </Link>
          <Link href="https://www.frontendmentor.io/profile/engrjvramos">
            <SiFrontendmentor className="h-6 w-6 hover:text-white transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
