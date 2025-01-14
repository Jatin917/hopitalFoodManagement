import { useState } from "react";
import FormInput from "./FormInput";
import RoleSelector from "./RoleComponent";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { signUpUser } from "../../services/api";
import { roleEnum } from "../../utils/typeDefinition";
import { toast } from "react-toastify";
interface propsType {
  setIsLoggedIn: (arg0: boolean) => void
}

const SignUpForm:React.FC<propsType> = ({setIsLoggedIn}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      role: roleEnum.ADMIN,
      contactInfo: ''
    });
  
    const handleSubmit = async(e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const result = await signUpUser(formData);
      if(!result?.success){
        toast.error(result?.message);
      }
      const token = result?.data.token;
      if(token){
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        toast.success(result.message);
        return;
      }
      toast.info(result?.message);
      console.log('SignUp Form Data:', formData);
    };
  
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-8 w-8 text-blue-600" />
          <h2 className="ml-2 text-2xl font-bold text-gray-800">Create Account</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e: { target: { value: string; }; }) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter your full name"
          />
  
          <FormInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e: { target: { value: string; }; }) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
          />
  
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
  
          <RoleSelector
            value={formData.role}
            onChange={(e: { target: { value: roleEnum; }; }) => setFormData({...formData, role: e.target.value})}
          />
  
          <FormInput
            label="Contact Information"
            type="text"
            value={formData.contactInfo}
            onChange={(e: { target: { value: string; }; }) => setFormData({...formData, contactInfo: e.target.value})}
            placeholder="Enter your contact number"
          />
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  
  export default SignUpForm;