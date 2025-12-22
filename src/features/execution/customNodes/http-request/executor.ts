import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../../types";
import ky, { type Options as KyOptions } from "ky";

type HttpRequestExecutorParams = {
  variableName?: string;
  endpointUrl?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<
  HttpRequestExecutorParams
> = async ({ data, nodeId, context, step }) => {
  // Publish loading state

  if (!data.endpointUrl) {
    // Todo publish error state
    throw new NonRetriableError("HTTP Request Node: No Endpoint configured");
  }

  if (!data.variableName) {
    // Todo publish error state
    throw new NonRetriableError(
      "HTTP Request Node: No Variable Name configured"
    );
  }

  const result = await step.run("httpRequest", async () => {
    const endpointUrl = data.endpointUrl!;
    const method = data.method || "GET";

    const option: KyOptions = { method };

    if (["PUT", "PATCH", "POST"].includes(method)) {
      option.body = data.body;
      option.headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await ky(endpointUrl, option);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        data: responseData,
        statusText: response.statusText,
      },
    };

    if (data.variableName) {
      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    }

    return {
      ...context,
      ...responsePayload,
    };
  });

  // Todo publish success state

  return result;
};
