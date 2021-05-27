import React from "react";

import { Link, Route, useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/articles">NewArticle</Link>
      </div>
      <div>
        <p>Dashboard</p>
        <button>Get All Articles</button>
      </div>
    </div>
  );
}
