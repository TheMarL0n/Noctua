import { SignInResponse } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { username, password } = await request.json();

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };

    // make the request to authenticate the user
    const tokensResponse: SignInResponse = await fetch(
        "https://noctua-app-dev.azurewebsites.net/services/token/",
        options,
    ).then((res) => res.json());

    if ("error" in tokensResponse) {
        // Bad request
        return Response.json(tokensResponse);
    }

    const response = NextResponse.json(tokensResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

    // Save the tokens in the cookie response
    response.cookies.set({
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        name: "accessToken",
        path: "/",
        maxAge: 60 * 60 * 24 * 365 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
        value: tokensResponse.access,
    });

    response.cookies.set({
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        name: "refreshToken",
        path: "/",
        maxAge: 60 * 60 * 24 * 365 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
        value: tokensResponse.refresh,
    });

    return response;
}