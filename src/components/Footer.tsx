import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="footer text-center">
            <div className="container small-container">
                <p>Copyright © 2025  <Link to="/">Clocksynk</Link>. All rights reserved. Terms & Conditions · Privacy Policy</p>
            </div>
        </footer>
    )
}