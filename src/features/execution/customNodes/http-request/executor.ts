import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../../types";
import ky, { type Options as KyOptions } from "ky";

type HttpRequestExecutorParams = {
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

  const result = await step.run("httpRequest", async () => {
    const endpointUrl = data.endpointUrl!;
    const method = data.method || "GET";

    const option: KyOptions = { method };

    if (["PUT", "PATCH", "POST"].includes(method)) {
      option.body = data.body;
    }

    const response = await ky(endpointUrl, option);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      ...context,
      httpResponse: {
        status: response.status,
        data: responseData,
        statusText: response.statusText,
      },
    };
  });

  // Todo publish success state

  return result;
};
