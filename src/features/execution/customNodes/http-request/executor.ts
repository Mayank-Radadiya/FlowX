import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import ky, { type Options as KyOptions } from "ky";
import handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channel/httpRequestChannel";

type HttpRequestExecutorParams = {
  variableName: string;
  endpointUrl: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

handlebars.registerHelper("json", function (context) {
  try {
    return new handlebars.SafeString(JSON.stringify(context ?? {}, null, 2));
  } catch {
    return "{}";
  }
});

export const httpRequestExecutor: NodeExecutor<
  HttpRequestExecutorParams
> = async ({ data, nodeId, context, step, publish }) => {
  // Publish loading state
  await publish(httpRequestChannel().status({ nodeId, status: "loading" }));

  if (!data.endpointUrl) {
    // Todo publish error state
    await publish(httpRequestChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("HTTP Request Node: No Endpoint configured");
  }

  if (!data.variableName) {
    // Todo publish error state
    await publish(httpRequestChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError(
      "HTTP Request Node: No Variable Name configured"
    );
  }

  if (!data.method) {
    // Todo publish error state
    await publish(httpRequestChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("HTTP Request Node: No Method configured");
  }

  try {
    const result = await step.run("httpRequest", async () => {
      const endpointUrl = handlebars.compile(data.endpointUrl)(context);
      const method = data.method;

      const option: KyOptions = { method };

      if (["PUT", "PATCH", "POST"].includes(method)) {
        const resolved = handlebars.compile(data.body || "{}")(context);
        JSON.parse(resolved);
        option.body = resolved;
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

      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    });

    // Todo publish success state
    await publish(httpRequestChannel().status({ nodeId, status: "success" }));

    return result;
  } catch (error) {
    await publish(httpRequestChannel().status({ nodeId, status: "error" }));
    throw error;
  }
};
