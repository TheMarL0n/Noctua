import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(init: RequestInit | undefined, request: any) {

    const cookieStore = cookies();//get all the cookies
    const token = cookieStore.get('accessToken');  //save the access cookie from cookies list generated in /api/auth/login/route.tsx

    const slug = request.query;

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

    //Call the endpoint and return the "Folders list" using the Bearer token (access token)
    try {

        const response = await fetch(`${process.env.ENDPOINT}/services/api/listaNotas/`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            ...init,
        }).then((res) => res.json());

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