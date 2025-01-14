import { roleEnum } from "../../utils/typeDefinition";

interface PropsType {
    value:string,
    onChange:(e: { target: { value: roleEnum; }; }) => void
}

const RoleSelector:React.FC<PropsType> = ({ value, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Role
      </label>
      <select 
        value={value} 
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value={roleEnum.ADMIN}>ADMIN</option>
        <option value={roleEnum.PANTRY_STAFF}>Pantry Staff</option>
        <option value={roleEnum.DELIVERY_PERSONNEL}>Delivery Personnel</option>
      </select>
    </div>
  );
  export default RoleSelector;