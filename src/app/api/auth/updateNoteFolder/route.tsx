import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {

    const cookieStore = cookies(); //get all the cookies
    const token = cookieStore.get('accessToken'); //save the access cookie from cookies list generated in /api/auth/login/route.tsx
    const { key, keyTwo, keyThree, paramId, paramTwo, paramThree} = await request.json();

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
    body.append(key, paramId);
    body.append(keyTwo, paramTwo);
    body.append(keyThree, paramThree);

    const options: RequestInit = {
        method: "PUT",
        body,
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    };

    //Call the endpoint and return the "Subject list" using the Bearer token (access token)
    try {
        const response = await fetch(
             `${process.env.DEV_ENDPOINT}/services/api/actualizaNotaCarpeta/`,
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