import React, { Fragment } from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <Fragment>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#5d5bd4", "#0067b8", "#5d5bd4", "#0067b8", "#5d5bd4"]}
      />
    </Fragment>
  );
};

export default Loader;
