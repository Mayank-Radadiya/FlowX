interface Props {
  params: Promise<{ workflowId: string }>;
}

async function page({ params }: Props) {
  const { workflowId } = await params;

  return <div>Workflow ID: {workflowId}</div>;
}

export default page;
