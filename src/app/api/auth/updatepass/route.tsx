import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {
        key, paramId, keyTwo, paramIdTwo, keyThree, paramIdThree, urlSlug
    } = await request.json();

    const body = new FormData();

    body.append(key, paramId);
    body.append(keyTwo, paramIdTwo);
    body.append(keyThree, paramIdThree);

    const options: RequestInit = {
        method: "POST",
        body
    };

    //Call the endpoint and return the "Subject list" using the Bearer token (access token)
    try {
        const response = await fetch(
            `${process.env.ENDPOINT}/services/changePassword/`,
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