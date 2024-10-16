'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useAppContext } from '@/app/Context/AppContext';
import { emptyUser, questions, registerUserFormErrors } from '@/app/Constants/Constants';
import FormPasswordInput from '@/app/Components/FormPasswordInput';
import FormSelectQuestionAndAnswer from '@/app/Components/FormSelectQuestionAndAnswer';
import usersService from '@/app/Services/usersService';
import { validatePassword, validateUsername } from '@/app/Helpers/Helpers';

const AboutUser = () => {
  const [formData, setFormData] = useState(emptyUser);
  const [isResetUsingPassword, setIsResetUsingPassword] = useState(false);
  const [isResetUsingQuestion, setIsResetUsingQuestion] = useState(false);
  const [errors, setErrors] = useState(registerUserFormErrors)
  const [currentOperation, setCurrentOperation] = useState("Update");
  const service = new usersService()
  const userContext = useAppContext()[0].userContext;

  useEffect(() => {
    setUser();
  }, [])

  const setUser =()=>{
    setFormData({ ...emptyUser, userName: userContext.user.userName, email: userContext.user.email, displayName: userContext.user.displayName })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (!validatePassword(value)) {
        setErrors({ ...errors, password: "Invalid password, password must have Capital, small, number and special character" })
      } else {
        setErrors({ ...errors, password: "" })
      }
    } else if (name === "newPassword") {
      setErrors({...errors,newPassword : ""});
      if (!validatePassword(value)) {
        setErrors({ ...errors, newPassword: "Invalid password, password must have Capital, small, number and special character" })
      } else {
        setErrors({ ...errors, newPassword: "" })
      }

    } else if (name === "confirmPassword") {
      setErrors({...errors,confirmPassword:""});
      if (!validatePassword(value)) {
        setErrors({ ...errors, confirmPassword: "Invalid password, password must have Capital, small, number and special character" })
      } else {
        setErrors({ ...errors, confirmPassword: "" })
      }
    }else if (name === "userName") {
      if (!validateUsername(value)) {
        setErrors({ ...errors, username: "Invalid username, can only contain number or character" })
      } else {
        setErrors({ ...errors, username: "" })
      }
    }else if(name ==="email"){
      setErrors({ ...errors, email: "" })
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {

      debugger;

    if(Object.values(errors).filter((error)=>error !=="").length == 0){
      if (currentOperation === "Update") {

        const result = await service.updateUser(formData);
        const message = result.value.statusText
        const status = result.value.status
          if( status ==="Error" && message.includes("password") ){
            setErrors({...errors,password : message});
          }else{
            setErrors({...errors,password :""});
            resetForm();
            updateApplication
          }

      } else if (currentOperation === "Forget Password") {

        const result = await service.forgettUserPasssword(formData);
        const message = result.value.statusText
        const status = result.value.status

        if(status === "Error" && message.includes("Question or answer is wrong!")){
          setErrors({...errors,answer : message});
        }else {
          setErrors({...errors,answer : ""});
          // resetForm();
          // updateApplication();
        }

      } else if (currentOperation === "Reset Password") {
        if(formData.newPassword === formData.confirmPassword){
          const result = await service.resetUserPasssword(formData);
          const message = result.value.statusText
          const status = result.value.status
  
          if(status === "Error" && message.includes("Old password is incorrect")){
            setErrors({...errors,password : message});
          }else {
            setErrors({...errors,password : ""});
            resetForm();
            updateApplication();
          }

        }else {
              setErrors({...errors,newPassword : "New Password and Confirm password don't match!",confirmPassword:"New Password and Confirm password don't match!"});
        }

      }
    }

    } catch (e: any) {

      console.log(e)

    }

  };

  const updateApplication = () => {

    localStorage.clear();
    window.location.reload();
  }

  const resetForm = () => {
    setUser();
    setErrors(registerUserFormErrors);
    setCurrentOperation("Update")

    setIsResetUsingQuestion(false);
    setIsResetUsingPassword(false);
  }

  const forgetPassword = () => {
    setCurrentOperation("Forget Password")
    setIsResetUsingQuestion(true);
    setIsResetUsingPassword(false);
  }

  const resetPassword = () => {
    setCurrentOperation("Reset Password")
    setIsResetUsingQuestion(false);
    setIsResetUsingPassword(true);
  }


  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>

      <form onSubmit={handleSubmit} className=" mx-auto flex-col space-y-4 p-6 bg-white shadow-md rounded-lg col-span-full">
        <div className='text-red-600'>
          {errors.confirmPassword}
        </div>
        <div className='min-h-64 overflow-y-scroll flex-col space-y-4'>
        <div className="form-group   col-span-6" >
          <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className='text-red-600'>
            {errors.username}
          </div>
        </div>

        <div className="form-group   col-span-6">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group  ">
          <label htmlFor="displayName" className="block text-gray-700 font-bold mb-2">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isResetUsingQuestion &&
          <FormSelectQuestionAndAnswer formData={formData} handleChange={handleChange} errorMessage={errors.answer} />
        }

        {/* <div className="form-group  ">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">{isResetUsingPassword &&"Old" }Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <FormPasswordInput currentValue={formData.password} handleChange={handleChange} title={isResetUsingPassword ? "Old Password" : isResetUsingQuestion ? "New Password" :"Password"} filedName={"password"} errorMessage={errors.password} />

        {isResetUsingPassword &&
          <div className='flex-col space-y-4'>
            <FormPasswordInput currentValue={formData.newPassword} handleChange={handleChange} title={isResetUsingPassword ? "New Password" : "Password"} filedName={"newPassword"} errorMessage={errors.newPassword} />

            <FormPasswordInput currentValue={formData.confirmPassword} handleChange={handleChange} title={isResetUsingPassword ? "Confirm Password" : "Password"} filedName={"confirmPassword"} errorMessage={errors.confirmPassword} />
          </div>
        }
        </div>

        <div className='text-blue-500 gap-3 flex justify-end items-center'>
          {(currentOperation !== "Reset Password") &&
            <button type='button' onClick={() => resetPassword()} className='hover:underline'>Reset Password</button>
          }
          {(currentOperation !== "Forget Password") &&
            <button type='button' onClick={() => forgetPassword()} className='hover:underline'>Forget Password</button>
          }

        </div>
        <div className='flex gap-5 justify-center'>
          <button
            type="submit"
            className=" bg-blue-500 w-48 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {currentOperation}
          </button>
          <button type='button' onClick={resetForm} className='w-48 bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300'>
            Reset
          </button>
        </div>

      </form>

    </div>
  );
};

export default AboutUser;
