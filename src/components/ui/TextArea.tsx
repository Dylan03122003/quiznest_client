import { ChangeEvent, useState } from "react";

interface TextAreaProps {
  // Styles
  borderColor?: string;
  borderErrorColor?: string;
  rounded?: string;
  textInputColor?: string;
  textLabelColor?: string;
  textErrorColor?: string;
  width?: string;
  //Other properties
  onChange: (text: string) => void;
  placeholder: string;
  value: string;
  emptyErrorMessage?: string;
  label: string;
}

const TextArea = ({
  borderColor = "border-gray-500",
  rounded = "rounded-sm",
  textInputColor = "text-gray-700",
  textLabelColor = "text-gray-600",
  textErrorColor = "text-red-400",
  borderErrorColor = "border-red-400",
  onChange,
  placeholder,
  value = "",
  emptyErrorMessage = "Can't be empty",
  label,
  width = "w-[300px]",
}: TextAreaProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  function handleAutoResize(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = `70px`;
    const scHeight = event.target.scrollHeight;
    event.target.style.height = `${scHeight}px`;
    onChange(event.target.value);
    setIsTouched(true);
  }

  function hasError() {
    return isTouched && value?.trim() === "";
  }
  return (
    <div className={`${width}`}>
      <label
        htmlFor="textarea"
        className={`${hasError() ? `${textErrorColor}` : `${textLabelColor}`} `}
      >
        {label}
      </label>
      <textarea
        value={value}
        id="textarea"
        onChange={(e) => handleAutoResize(e)}
        placeholder={placeholder}
        className={`border border-solid w-full p-2 mt-2 outline-none ${rounded} ${textInputColor} ${
          hasError() ? `${borderErrorColor}` : `${borderColor}`
        }`}
      ></textarea>

      <p className={`mt-2 ${textErrorColor} h-[24px]`}>
        {hasError() ? emptyErrorMessage : ""}
      </p>
    </div>
  );
};

export default TextArea;
