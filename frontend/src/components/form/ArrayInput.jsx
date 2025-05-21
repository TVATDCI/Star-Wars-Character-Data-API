import PropTypes from "prop-types";

export default function ArrayInput({ label, name, value, onChange }) {
  return (
    <div className="mb-2">
      {label && (
        <label className="block text-left mb-1 text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={value.join(",")}
        onChange={(e) => onChange(e, name)}
        placeholder={`${label} (comma separated)`}
        className="p-2 w-full"
      />
    </div>
  );
}

ArrayInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
