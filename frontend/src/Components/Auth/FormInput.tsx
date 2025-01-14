interface propsType {
    label:string,
    type:string,
    value:string,
    onChange:(e: { target: { value: string; }; })=>void,
    placeholder:string
}

const FormInput:React.FC<propsType> = ({ label, type, value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
  export default FormInput