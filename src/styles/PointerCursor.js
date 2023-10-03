import React, { useEffect, useState } from "react";
import $ from "jquery";

function PointerComponent() {
  useEffect(() => {
    const pointSize = $(".pointer").width() / 2;

    $("#doz_body").mousemove(function (e) {
      $(".pointer").css("top", e.pageY - pointSize);
      $(".pointer").css("left", e.pageX - pointSize);
      $(".pointer").fadeIn();
    });

    $(".btn,input,a,textarea").on("mouseover", function () {
      $(".pointer").css({
        width: "68px",
        height: "68px",
        background: "none",
        "transition-property": "width,height,background",
        "transition-duration": "0.5s",
      });
    });

    $(".btn,input,a,textarea").on("mouseout", function () {
      $(".pointer").css({
        width: "32px",
        height: "32px",
        background: "#000",
        "transition-property": "width,height,background",
        "transition-duration": "0.5s",
      });
    });

    // Optional: Clean up event listeners to avoid memory leaks
    return () => {
      $("#doz_body").off("mousemove");
      $(".btn,input,a,textarea").off("mouseover");
      $(".btn,input,a,textarea").off("mouseout");
    };
  }, []);

  return <div className="pointer"></div>;
}

export default PointerComponent;
