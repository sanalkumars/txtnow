import React, { useState } from 'react'
import BackGround from '@/assets/login2.png';
import Victory from '@/assets/victory.svg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';



const AuthPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");


    // function for validation

    const validateUser=()=>{
        if(!email.length ){
            toast.error("Email and password is required!!");
            return false
        }
        if(!password.length ){
            toast.error(" Password is required!!");
            return false
        }
        if(password!==confirmPass){
            toast.error(" Password and confirm Password does not match!!");
            return false
        }
        return true;
    }
    const validateUserLogin=()=>{
        if(!email.length ){
            toast.error("Email and password is required!!");
            return false
        }
        if(!password.length ){
            toast.error(" Password is required!!");
            return false
        }
        return true;
    }


    // function for handling login and signup
    const HandleLogin = async () => {
        if (validateUserLogin()) {
            const response = await apiClient.post(LOGIN_ROUTE,
             {email,password},
             {withCredentials: true}
         );
         if (response.data.user.id) {
            if (response.data.user.profileSetup) {
                navigate("/chat");
            }else{
                navigate("/profile");
            }
         }
        
            console.log({response});
         }
    }

    const HandleSignUp = async () => {
        if (validateUser()) {
           const response = await apiClient.post(SIGNUP_ROUTE,
            {email,password},
            {withCredentials: true}
        );

        if (response.status===201) {
            navigate('/profile');
         }
           console.log({response});
        }
    }

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
            {/* changed the height to 90vh from 80vh to make the button insied the div for signup tab */}
            <div className='h-[90vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 '>
                
                <div className=" flex flex-col gap-10 items-center justify-center">
                    <div className=" flex items-center justify-center">
                        <h2 className="text-5xl font-bold md:text-6xl">
                            welcome
                        </h2>
                        <img src={Victory} alt="Victory Emoji" className='h-[100px]' />
                    </div>
                    <p className='font-medium text-center'>
                        Fill your data to start a new chat world!
                    </p>
                    <div className=" flex items-center justify-center w-full">
                        <Tabs className='w-3/4' defaultValue='login'>
                            <TabsList className='bg-transparent rounded-none w-full' >
                                <TabsTrigger value='login' className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full
                                    data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                                    Login
                                </TabsTrigger>

                                <TabsTrigger value='signup' className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full
                                    data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                                    SignUp
                                </TabsTrigger>

                            </TabsList>
                            <TabsContent className=" flex flex-col gap-5 mt-10" value='login' >

                                <Input
                                    className="rounded-full p-6"
                                    placeholder="Email"
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <Input
                                    className="rounded-full p-6"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <Button className="rounded-full p-6" onClick={HandleLogin}>
                                    Login
                                </Button>

                            </TabsContent>
                            <TabsContent className=" flex flex-col gap-1 " value='signup' >

                                <Input
                                    className="rounded-full p-6"
                                    placeholder="Email"
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <Input
                                    className="rounded-full p-6"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <Input
                                    className="rounded-full p-6"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={confirmPass}
                                    onChange={e => setConfirmPass(e.target.value)}
                                />

                                <Button className="rounded-full p-6" onClick={HandleSignUp}>
                                    SignUp
                                </Button>

                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className=" hidden xl:flex justify-center items-center">
                    <img src={BackGround} alt="Background Image" className='h-[400px]' />
                </div>
            </div>
        </div>
    )
}

export default AuthPage