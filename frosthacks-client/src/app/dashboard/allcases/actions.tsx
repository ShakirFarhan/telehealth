'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function acceptCase(caseId: string) {
    
    try {

        const acceptCaseResponse = await fetch(`https://frosthacks-backend.onrender.com/api/v1/hospital/case/${caseId}/accept`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${cookies().get('hospAdminToken')?.value}`
            }
        })

        if (!acceptCaseResponse.ok) {
            console.log(await acceptCaseResponse.json());
        }

    } catch (error) {
        throw new Error('Server error accepting case');
    }

    revalidatePath('/dashboard/allcases');
    revalidatePath('/dashboard/livecases');

}