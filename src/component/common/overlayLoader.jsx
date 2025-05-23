import React from "react";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";


const OverlayLoading = ({
  isLoading,
  children ,
  loaderColor = "#BD03FC",
  loaderSize = 20,
}) => {


  // Adjust overlay color based on theme
  const overlayBackgroundColor = "rgba(0, 0, 0, 0.08)";

  return (
    <>
      {children}
      {isLoading && (
        <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: overlayBackgroundColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1200, // Ensure the loader appears above other content
            position:'fixed',
          }}
        >
          <BeatLoader
            color={loaderColor}
            loading={isLoading}
            size={loaderSize}
            speedMultiplier={.9}
          />
        </div>
      )}
    </>
  );
};

OverlayLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loaderColor: PropTypes.string,
  loaderSize: PropTypes.number,
};


export default OverlayLoading;
