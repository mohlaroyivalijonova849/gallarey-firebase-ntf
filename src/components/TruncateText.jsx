import React from "react";

function TruncateText({ text }) {
  if (typeof text !== "string") {
    // Handle the case where text is not a string (e.g., it's undefined or of another type)
    return <div>Invalid Text</div>;
  }

  const words = text.split(" ");

  if (words.length > 4) {
    const truncatedText = words.slice(0, 4).join(" ") + " ...";
    return <div className="capitalize">{truncatedText}</div>;
  } else {
    return <div className="capitalize">{text}</div>;
  }
}

export default TruncateText;
