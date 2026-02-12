import PropTypes from 'prop-types';

export default function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className='mb-2'>
      {label && (
        <label className='block text-left mb-1 text-sm font-semibold text-error'>
          {label}
        </label>
      )}
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className='p-2 w-full'
      />
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
