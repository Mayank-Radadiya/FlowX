import { sendWorkflowExecution } from "@/inngest/helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: "Workflow ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const stripeData = {
      eventId: body.eventId,
      eventType: body.eventType,
      event: body.event,
      raw: body.data?.object,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripeData: stripeData,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to process stripe trigger" },
      { status: 500 }
    );
  }
}
