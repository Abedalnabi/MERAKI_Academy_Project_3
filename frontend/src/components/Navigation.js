import React from "react";

import { Link, Route, useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

export default function Navigation() {
  return (
    <div style={{ flex: "warp", gap: "15px" }}>
      <Link to="/login">login</Link>
      <Link to="/Register">Regrets</Link>
    </div>
  );
}
