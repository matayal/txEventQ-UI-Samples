import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import * as React from "react";

function Router() {
  return (
    <div className="container">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* <Route path="/create" element={<Create />}></Route>
          <Route path="/overview" element={<Read />}></Route>
          <Route exact path="/overview/:id/" component={Read} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default Router;
