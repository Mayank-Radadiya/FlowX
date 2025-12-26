import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

// Infer the expected input type of the workflows.getMany procedure
type Input = inferInput<typeof trpc.credentials.getMany>;

// Prefetch workflows list based on the given params
export const prefetchCredentials = (params: Input) => {
  return prefetch(trpc.credentials.getMany.queryOptions(params));
};

// prefetch one workflow by id
export const prefetchCredentialById = (id: string) => {
  return prefetch(trpc.credentials.getOne.queryOptions({ id }));
};
