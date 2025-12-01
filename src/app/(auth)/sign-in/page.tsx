import { requiredUnAuth } from "@/lib/auth-utils";
import SignInForm from "../_components/signin-form";

const Page = async () => {
  await requiredUnAuth();
  return (
    <>
      <SignInForm />
    </>
  );
};

export default Page;
