interface Props {
  params: Promise<{ executionId: string }>;
}

async function page({ params }: Props) {
  const { executionId } = await params;

  return <div>Execution ID: {executionId}</div>;
}

export default page;
