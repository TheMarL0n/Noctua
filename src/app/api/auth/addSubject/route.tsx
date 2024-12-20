import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookieStore = cookies(); //get all the cookies
    const token = cookieStore.get('accessToken'); //save the access cookie from cookies list generated in /api/auth/login/route.tsx

    const data = await request.formData();
    const folderName = data.get('carpeta');
    const ProcessName = data.get('proceso');
    const processType = data.get('tipoProceso');
    const file = data.get('archivos');

    //chec if there's token
    if (!token) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const body = new FormData();

    if(!folderName) return
    if(!ProcessName) return
    if(!processType) return
    if(!file) return

    body.append('carpeta', folderName);
    body.append('proceso', ProcessName);
    body.append('tipoProceso', processType);
    body.append('archivos', file);

    const options: RequestInit = {
        method: "POST",
        body,
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    };

    

    //Call the endpoint and return the "Subject list" using the Bearer token (access token)
    try {
        const response = await fetch(
            `${process.env.DEV_ENDPOINT}/services/api/creaProceso/`,
            options,
        ).then((res) => res.json());
        return new Response(JSON.stringify(response), {
            status: 200,
        });
    } catch (e) {
        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 400,
            }
        );
    }

}