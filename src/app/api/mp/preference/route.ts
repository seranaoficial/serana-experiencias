import { NextResponse } from "next/server";

// Endpoint para crear una preferencia de MercadoPago (server-side)
// Protege el access token del cliente.

export async function POST(req: Request) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "mp_not_configured" },
      { status: 500 },
    );
  }

  let body: {
    title?: string;
    unit_price?: number;
    quantity?: number;
    email?: string;
    name?: string;
    description?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const unitPrice = Number(body.unit_price);
  if (!unitPrice || unitPrice <= 0) {
    return NextResponse.json({ error: "invalid_price" }, { status: 400 });
  }

  const title = body.title || "Cupo Serana Experiencias";
  const quantity = Number(body.quantity) || 1;

  const preferencePayload = {
    items: [
      {
        title,
        quantity,
        unit_price: unitPrice,
        currency_id: "COP",
      },
    ],
    payer: {
      email: body.email || undefined,
      name: body.name || undefined,
    },
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_SITE_URL || "https://serana.social"}/?pago=exito`,
      failure: `${process.env.NEXT_PUBLIC_SITE_URL || "https://serana.social"}/?pago=error`,
      pending: `${process.env.NEXT_PUBLIC_SITE_URL || "https://serana.social"}/?pago=pendiente`,
    },
    auto_return: "approved",
    statement_descriptor: "SERANA EXPERIENCIAS",
    notification_url: process.env.MP_WEBHOOK_URL,
  };

  try {
    const mpResp = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencePayload),
      },
    );

    const mpData = await mpResp.json();
    if (!mpResp.ok) {
      console.error("[mp/preference] MP rejected:", mpResp.status, mpData);
      return NextResponse.json(
        { error: "mp_preference_failed", detail: mpData },
        { status: 502 },
      );
    }

    return NextResponse.json({
      id: mpData.id,
      init_point: mpData.init_point,
      sandbox_init_point: mpData.sandbox_init_point,
    });
  } catch (err) {
    console.error("[mp/preference] error:", err);
    return NextResponse.json({ error: "mp_error" }, { status: 500 });
  }
}
