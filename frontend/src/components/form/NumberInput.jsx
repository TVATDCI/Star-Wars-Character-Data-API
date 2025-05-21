import PropTypes from "prop-types";

export default function NumberInput({ label, name, value, onChange }) {
  return (
    <div className="mb-2">
      {label && (
        <label className="block text-left mb-1 text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <input
        type="number"
        name={name}
        value={value || ""} // Ensure value is a string for controlled input
        onChange={onChange}
        min="0"
        placeholder={label}
        className="p-2 w-full"
      />
    </div>
  );
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};
