import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ImagePreview = ({ image }) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (typeof image !== "string") {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setImagePreview(reader.result);
      };
    } else {
      setImagePreview(image);
    }
  }, [image]);

  return (
    <>
      {imagePreview && (
        <>
          <img className="max-h-full" src={imagePreview} alt="cover image" />
        </>
      )}
    </>
  );
};

export default ImagePreview;
