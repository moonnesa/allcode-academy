import { useState } from "react";

function FileInput({ onChange, fileName, setFileName }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : null);
    if (onChange) onChange(e);
  };

  return (
    <div className="items-center gap-3 pt-2">
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer border border-gray-400 bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 active:bg-gray-300"
      >
        Choose file
      </label>
      <span className="text-sm text-gray-500">
        {fileName ?? "No file chosen"}
      </span>
    </div>
  );
}

export default FileInput;