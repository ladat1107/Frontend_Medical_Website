import { useAuthenContext } from "@/contexts/AuthenContext";
import { MODAL_TYPE } from "@/constant/general";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

function AuthenModal() {
  const { showModal } = useAuthenContext();

  return (
    <div>
      {showModal === MODAL_TYPE.login && <LoginForm />}
      {showModal === MODAL_TYPE.register && <RegisterForm />}
    </div>
  );
}

export default AuthenModal;
