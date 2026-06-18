import React from "react";
import Head from "./head";

const Layout = ({ title, children }) => (
  <>
    <Head
      title={title}
      description="Wait Times Can Be Costly.Know What To Expect, Collect And Share Your In And Out Times At Any Terminal In Real-Time. You Can Time Stamp Your Wait Times At Any Terminal So That You Can Plan Your Visits To Any Port Or Rail Terminal By Looking At The Current Wait Times And Planning A More Efficient Trip. You Can Also Share Your Thoughts With The Freighting Community."
    />

    {children}
  </>
);

export default Layout;
