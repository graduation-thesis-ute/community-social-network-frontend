import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import LogoSite from "@/assets/logo_site.png";
const Login = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline m-5">Login page</h1>
      <img src={LogoSite} alt="Logo site" className="w-1/6 h-1/6" />
      <Button>
        <Mail /> Login with Email
      </Button>
    </div>
  );
};
export default Login;
