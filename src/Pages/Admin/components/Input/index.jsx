import { forwardRef } from "react";

const Input = (
  { label, id, type, error, required, holder, col, ...inputProps },
  ref
) => {
  return (
    <div className={`form-group ${col} col-12 mb-3`}>
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>

      <input
        ref={ref}
        id={id}
        type={type ? type : "text"}
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder={holder}
        {...inputProps}
      />
      {error && <p className="form-error invalid-feedback">{error}</p>}
    </div>
  );
};
export default forwardRef(Input);
