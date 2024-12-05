import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(request: Request) {
    const cookieStore = cookies(); //get all the cookies
    const token = cookieStore.get('accessToken'); //save the access cookie from cookies list generated in /api/auth/login/route.tsx
    const {
        key, keyQuestion, keyThird, keyFourth,
        paramId, paramPregunta, paramThird, paramFourth, urlSlug
    } = await request.json();

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
    body.append(keyQuestion, paramPregunta);
    body.append(keyThird, paramThird);
    body.append(keyFourth, paramFourth);
 

    const options = {
        method: "POST",
        body,
        signal: AbortSignal.timeout(70000),
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    };

    //Call the endpoint and return the "Subject list" using the Bearer token (access token)
    try {
        const response = await fetch(
            `https://noctua-app-dev.azurewebsites.net/services/${urlSlug}/`,
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