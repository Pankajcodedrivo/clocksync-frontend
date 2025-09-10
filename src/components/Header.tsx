import { Link } from "react-router-dom";
import defaultLogo from "../assets/images/logo.svg"; // your fallback logo

interface Settings {
  sitelogo?: string;
}

interface HeaderProps {
  settings: Settings | null
}


export default function Header({ settings }: HeaderProps) {
  const logoToShow = settings?.sitelogo && settings.sitelogo.trim() !== ""
    ? settings.sitelogo
    : defaultLogo;

  return (
    <header className="header">
      <div className="container small-container">
        <div className="logo-area text-center">
          <Link to="/">
            <img src={logoToShow} alt="Site Logo" />
          </Link>
        </div>
      </div>
    </header>
  );
}
