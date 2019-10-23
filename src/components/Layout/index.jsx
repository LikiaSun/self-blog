import React from "react";
import { Link } from "gatsby";

export default function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`;
  return (
    <div>
      <header
        className={`main-header${
          location.pathname === rootPath ? "" : "-article"
        }`}
      >
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer className="main-footer">
        © {new Date().getFullYear()}, Built by
        {` `}
        <span>Likia Sun</span>
      </footer>
    </div>
  );
}
