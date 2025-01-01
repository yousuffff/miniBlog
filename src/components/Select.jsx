import React, { useId, forwardRef } from "react";


const Select = forwardRef(function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-4 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
)

export default Select;
// export default forwardRef(Select) //we can also write like this
