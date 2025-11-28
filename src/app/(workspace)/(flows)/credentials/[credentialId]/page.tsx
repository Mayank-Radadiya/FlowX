interface Props {
  params: Promise<{ credentialId: string }>;
}

async function page({ params }: Props) {
  const { credentialId } = await params;

  return <div>Credential ID: {credentialId}</div>;
}

export default page;
