import { loginFormControls } from '@/config';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CommonForm from '@/components/common/form';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';

export default function Login() {

  const initialState = {
    email: "",
    password: "",
  };

    const {toast} = useToast()

    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState);
    function onSubmit(e){
      e.preventDefault();
      dispatch(loginUser(formData)).then((data)=>{
        if(data?.payload?.success){
          toast({
            title: data?.payload?.message
          })
        }
        else{
          toast({
            title: data?.payload?.message
          })
        }
      })
    }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}
