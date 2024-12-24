import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const cookieStore = cookies();//get all the cookies
    const token = cookieStore.get('accessToken');  //save the access cookie from cookies list generated in /api/auth/login/route.tsx
    const subjectParam = request.nextUrl.searchParams;
    const id = subjectParam.get('id')


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


    const options: RequestInit = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    };

    //Call the endpoint and return the "Folders list" using the Bearer token (access token)
    try {
        const response = await fetch(`${process.env.ENDPOINT}/cat/proceso/status/?id_proceso=${id}`,
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