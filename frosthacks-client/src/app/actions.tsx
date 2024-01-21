'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const userLogin = async (formData: FormData) => {

    try {
        
        const loginDetails = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        
        const makeUserLogin = await fetch('https://frosthacks-backend.onrender.com/api/v1/hospital/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        });

        if (!makeUserLogin.ok) {
            throw new Error('Issue logging in!');
        }
    
        const userLoginData = await makeUserLogin.json();

        cookies().set('hospAdminToken', userLoginData.accessToken, {
            maxAge: 24 * 60 * 60
        });

    } catch (error) {
        throw new Error('Error logging you in!');
    }
    
    redirect('/dashboard');

}