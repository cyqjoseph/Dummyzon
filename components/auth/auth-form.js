import { Fragment, useRef, useState } from "react";
import { createAccount } from "../../lib/helper";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { GoogleIcon, FacebookIcon, LinkedInIcon } from "../../lib/icons";
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
    <section className="authContainer">
      <div className="auth">
        <h1>{isLogin ? "Login" : "Sign up"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className="auth__control">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" required ref={nameInputRef}></input>
            </div>
          )}
          <div className="auth__control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="auth__control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <button className="auth__submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <div className="auth__signinContainer">
            {isLogin ? (
              <Fragment>
                <span className="auth__signinContainer-create">
                  Or Sign Up Using
                </span>
                <div className="auth__signinContainer-icons">
                  <span className="auth__signinContainer-icons-icon">
                    <GoogleIcon />
                  </span>
                  <span className="auth__signinContainer-icons-icon">
                    <FacebookIcon />
                  </span>
                  <span className="auth__signinContainer-icons-icon">
                    <LinkedInIcon />
                  </span>
                </div>
              </Fragment>
            ) : (
              ""
            )}

            <button
              type="button"
              onClick={switchAuthModeHandler}
              className="auth__signinContainer-signin"
            >
              {isLogin ? "Create new account" : "Login with your account"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default AuthForm;
