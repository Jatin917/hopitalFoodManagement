import { useState } from "react";
import RoleSelector from "./RoleComponent";
import FormInput from "./FormInput";
import { LogIn } from "lucide-react";
import { roleEnum } from "../../utils/typeDefinition";
import { signinUser } from "../../services/api";
import { toast } from "react-toastify";
interface propsType {
  setIsLoggedIn: (arg0: boolean) => void
}

const SignInForm:React.FC<propsType> = ({setIsLoggedIn}) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      role: roleEnum.ADMIN
    });
  
    const handleSubmit = async(e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const result = await signinUser(formData);
      if(!result?.success){
        toast.error(result?.message);
      }
      const token = result?.data.token;
      if(token){
        localStorage.setItem("token", token);
        toast.success(result.message);
        setIsLoggedIn(true);
        return;
      }
      toast.info(result?.message);
      console.log('SignUp Form Data:', formData);
    };
  
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="h-8 w-8 text-blue-600" />
          <h2 className="ml-2 text-2xl font-bold text-gray-800">Sign In</h2>
        </div>
  
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
          />
  
          <FormInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Enter your password"
          />
  
          <RoleSelector
            value={formData.role}
            onChange={(e: { target: { value: roleEnum; }; }) => setFormData({...formData, role: e.target.value})}

          />
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  };
  export default SignInForm