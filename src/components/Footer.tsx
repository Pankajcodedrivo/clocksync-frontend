import { Link } from "react-router-dom";
interface Settings {
  copyright: string;
  copyright2: string
}

interface FooterProps {
  settings: Settings | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer text-center">
      <div className="container small-container">
        <p>
          Copyright © {currentYear} <Link to="/">Clocksynk</Link>{" "}
          {settings?.copyright && <span>{settings?.copyright}</span>}.{" "}
          {settings?.copyright2}
        </p>
        <ul>
          <li>
            <Link to="">Terms & conditions</Link>
          </li>
          <li>
            <Link to="">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}