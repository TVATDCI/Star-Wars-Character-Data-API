import PropTypes from "prop-types";

export default function CheckboxInput({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center space-x-2 mb-2 text-white">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
