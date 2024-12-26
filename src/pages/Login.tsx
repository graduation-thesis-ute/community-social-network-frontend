import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Login = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline m-5">Login page</h1>
      <Button>
        <Mail /> Login with Email
      </Button>
    </div>
  );
};
export default Login;
