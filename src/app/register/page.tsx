import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/register-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}) => {
  const { redirectTo } = await searchParams;

  const { user } = await getSession();

  if (user) {
    redirect(redirectTo || "/");
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex justify-center items-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-sm text-center">
            Already have an account{" "}
            <Link
              href={`/login?redirectTo=${redirectTo || "/"}`}
              className="underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={"/login-image.webp"}
          width={1920}
          height={1080}
          alt="login-pizza"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
