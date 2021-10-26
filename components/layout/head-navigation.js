import Link from "next/link";
import { CartIcon } from "../../public/icons";
import { useSession, signOut } from "next-auth/client";
import { getFirstName } from "../../lib/helper";
import { useEffect, useState, useContext, useCallback } from "react";
import Context from "../../store/context";
import CartModal from "./cart-modal";
function HeadNavigation() {
  const [session, loading] = useSession();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cartModal, setCartModal] = useState(false);
  const Ctx = useContext(Context);

  const getUser = useCallback(async () => {
    try {
      const response = await fetch("/api/user-data/get-user", {
        method: "POST",
        body: JSON.stringify(session.user.email.toString()),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      Ctx.setCtxCartItems(data.data.cartItems);
      setName(data.data.name);
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    // check if name has changed after updating
    if (!Ctx.name) {
      getUser();
      setIsLoading(false);
    } else if (session) {
      // else reload name
      setName(Ctx.name);

      setIsLoading(false);
    }
  }, [Ctx.name, getUser, session]);

  function logOutHandler() {
    signOut({
      redirect: false,
    });
  }

  function toggleCartHandler() {
    setCartModal((prevState) => !prevState);
  }
  return (
    <header className="header">
      <CartModal onHide={toggleCartHandler} show={cartModal} />
      <Link href="/">
        <a className="header__logo">
          <div>Dummyzon</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <button>
                <Link href="/auth">Login</Link>
              </button>
            </li>
          )}

          {!isLoading && session && (
            <li>
              <span>Welcome back, {getFirstName(name) || ""}</span>
            </li>
          )}
          {!isLoading && session && (
            <li className="header__cart">
              <button onClick={toggleCartHandler}>
                Your Cart
                <CartIcon />
              </button>
            </li>
          )}
          {session && (
            <li>
              <button>
                <Link href="/settings">Account Settings</Link>
              </button>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logOutHandler}>
                <span className="header__logout">Log out</span>
              </button>
            </li>
          )}
          <li>
            <button>
              <Link href="/browse">Browse</Link>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default HeadNavigation;
