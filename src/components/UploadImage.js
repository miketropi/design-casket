import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function UploadImage({ onhandleChange }) {
  const fileTypes = ["JPEG", "JPG", "PNG"];

  // const handleChange = (file) => {
  //   console.log(file);
  //   setFile(file);

  //   let fr = new FileReader();
  //   fr.onload = function () {
  //     console.log(fr.result)
  //   }
  //   fr.readAsDataURL(file);
  // };

  return <div>
    <FileUploader
      classes="__file-upload-area"
      multiple={ false }
      handleChange={ onhandleChange } 
      name="file"
      maxSize={ 10 }
      types={ fileTypes }
    />
  </div>
}