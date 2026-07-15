import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formLink = process.env.GOOGLE_FORM_LINK;
  if (!formLink) {
    return new NextResponse("Please configure the env variables", {
      status: 500,
    });
  }

  // configure this according to your google form
  const fieldIdName = process.env.GOOGLE_FORM_FIELD_ID_NAME;
  const fieldIdEmail = process.env.GOOGLE_FORM_FIELD_ID_EMAIL;
  const fieldIdMessage = process.env.GOOGLE_FORM_FIELD_ID_MESSAGE;
  const fieldIdSocial = process.env.GOOGLE_FORM_FIELD_ID_SOCIAL;

  try {
    const body = await req.json();
    const { name, message, social, email } = body;

    const formData = new URLSearchParams();
    if (fieldIdName) formData.append(fieldIdName, name);
    if (fieldIdEmail) formData.append(fieldIdEmail, email);
    if (fieldIdMessage) formData.append(fieldIdMessage, message);
    if (fieldIdSocial && social) formData.append(fieldIdSocial, social);

    const res = await fetch(`${formLink}/formResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    return NextResponse.json("Success!");
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
