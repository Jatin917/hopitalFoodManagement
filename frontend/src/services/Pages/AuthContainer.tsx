import { useEffect, useState } from "react";
import SignUpForm from "../../Components/Auth/SignUpForm";
import SignInForm from "../../Components/Auth/SignInForm";
import { useNavigate } from "react-router-dom";

interface propsType {
  isLoggedIn:boolean,
  setIsLoggedIn: (arg0: boolean) => void
}

const AuthContainer:React.FC<propsType> = ({isLoggedIn, setIsLoggedIn}) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
      if(isLoggedIn){
        navigate('/');
      }
    },[isLoggedIn, navigate])

    return (
      <div className=" min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Hospital Food Delivery Management
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Efficient food service management for healthcare facilities
          </p>
        </div>
  
        {isSignUp ? <SignUpForm setIsLoggedIn={setIsLoggedIn}  /> : <SignInForm setIsLoggedIn={setIsLoggedIn} />}
  
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isSignUp 
              ? "Already have an account? Sign In" 
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    );
  };
  
  export default AuthContainer;