import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, [router]);
  return <AuthForm />;
}

export default HomePage;
