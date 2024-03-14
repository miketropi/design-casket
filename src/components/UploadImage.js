import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function UploadImage({ onUpload }) {
  const fileTypes = ["JPEG", "PNG"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    console.log(file);
    setFile(file);
  };

  return <div>
    <FileUploader
      classes="__file-upload-area"
      multiple={ false }
      handleChange={ handleChange }
      name="file"
      types={ fileTypes }
    />
    <p>{file ? JSON.stringify(file.name) : "no files uploaded yet"}</p>
  </div>
}