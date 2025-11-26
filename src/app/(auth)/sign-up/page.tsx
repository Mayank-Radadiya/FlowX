import { requiredUnAuth } from "@/lib/auth-utils";
import SignUpForm from "../_components/signup-form";

const Page = async () => {
  await requiredUnAuth();
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default Page;
