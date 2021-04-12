import React from "react";

import "./app.css";

const app = () => {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-3 bordered bg-primary">Content 1</div>
      <div className="col bordered bg-warning">Content 2</div>
    </div>
  </div>;
};

export default app;
