import { useRef, useState } from "react";
import { createAccount } from "../../lib/helper";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  const submitHandler = async function (e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef?.current?.value;
    if (!isLogin) {
      //creating account
      try {
        const result = await createAccount(
          enteredName,
          enteredEmail,
          enteredPassword
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        console.log(result);

        if (result.error) {
          console.log("Wrong credentials entered");
        } else {
          //temp validation
          router.replace("/browse");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const switchAuthModeHandler = function () {
    setIsLogin((prevState) => !prevState);
  };
  return (
    <section className="auth">
      <h1>{isLogin ? "Login" : "Sign up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef}></input>
          </div>
        )}
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin
              ? "Create new account"
              : "Login with your existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default AuthForm;
