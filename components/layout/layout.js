import { Fragment } from "react";

import HeadNavigation from "./head-navigation";

function Layout(props) {
  return (
    <Fragment>
      <HeadNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
