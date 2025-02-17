import { Field, ErrorMessage } from "formik";
import { CustomInputFieldProps } from "../utils/types";
const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  name,
  type,
  placeholder = "",
  className = "",
  required = false,
  error = "",
}) => {
  return (
    <div>
      <label className="block font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border p-2 rounded ${className}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>} {/* Display error */}
    </div>
  );
};

export default CustomInputField;
