import { useForm } from "react-hook-form";
import {
  HttpRequestFormValues,
  httpRequestSchema,
} from "./http-request.schema";
import { METHODS_WITH_BODY } from "./http-request.constants";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseHttpRequestFormProps {
  defaultData?: Partial<HttpRequestFormValues>;
  onSubmit: (data: HttpRequestFormValues) => void;
  onClose: () => void;
}

export function useHttpRequestForm({
  defaultData = {},
  onSubmit,
  onClose,
}: UseHttpRequestFormProps) {
  const form = useForm<HttpRequestFormValues>({
    resolver: zodResolver(httpRequestSchema),
    defaultValues: {
      variableName: defaultData.variableName || "",
      endpointUrl: defaultData.endpointUrl || "",
      method: defaultData.method || "GET",
      body: defaultData.body || "",
    },
  });

  const method = form.watch("method");
  const showBody = METHODS_WITH_BODY.has(method);

  const submit = form.handleSubmit((data) => {
    onSubmit(data);
    onClose();
  });

  return { form, submit, showBody };
}
