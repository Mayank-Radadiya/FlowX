import { inngest } from "./client";

interface sendWorkflowExecutionProps {
  workflowId: string;
  [key: string]: any;
}

export const sendWorkflowExecution = async (
  props: sendWorkflowExecutionProps
) => {
  return await inngest.send({
    name: "workflow/execute.workflow",
    data: props,
  });
};
