import React from "react";
import { Link } from "gatsby";
import "../../scss/style.scss";

export default function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`;
  return (
    <div>
      <header
        className={`main-header${
          location.pathname === rootPath ? "" : "-article"
        }`}
      >
        <h1 className="main-header">
          <Link to={`/`}>{title}</Link>
        </h1>
      </header>
      <>{children}</>
      <footer className="main-footer">
        © {new Date().getFullYear()}, Built by
        {` `}
        <span>Likia Sun</span>
      </footer>
    </div>
  );
}
