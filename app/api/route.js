import { NextResponse } from "next/server";
import getOpenAIResponse, { getToolResult } from "../service/openai";

export async function POST(request) {
  // Parse the JSON body from the request
  const body = await request.json();
  const { prompt } = body;

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const messages = [{ role: "user", content: prompt }];
  let result = await getOpenAIResponse(messages);

  let tool_calls;
  if ((tool_calls = result.choices[0].message.tool_calls)) {
    messages.push({
      role: "assistant",
      tool_calls: tool_calls,
    });

    for (let tool_call of tool_calls) {
      const toolResult = getToolResult(tool_call);

      messages.push({
        role: "tool",
        content: toolResult,
        tool_call_id: tool_call.id,
      });
    }

    result = await getOpenAIResponse(messages);
  }

  const content = result.choices[0].message.content;

  if (result.choices[0].finish_reason == "stop") {
    console.log(content);
    if (content.includes("invalid")) {
      return NextResponse.json(
        { message: JSON.parse(content) },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: JSON.parse(content) }, { status: 200 });
  }

  // For this example, we'll just echo back the prompt
  return NextResponse.json(
    {
      message: "Prompt received successfully",
      prompt: prompt,
    },
    { status: 200 }
  );
}
