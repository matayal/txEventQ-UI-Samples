import "./App.css";
import React, { useState, useEffect } from "react";

import Router from "./Component/Router";
function App() {
  const [tabledark, setTableDark] = useState("");

  return (
    <>
      <div className="form-check form-switch ">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className={`table ${tabledark}`}>
        <Router />
      </div>
    </>
  );
}
export default App;
