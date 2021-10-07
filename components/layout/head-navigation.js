import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { getFirstName } from "../../lib/helper";

function HeadNavigation() {
  const [session, loading] = useSession();
  function logOutHandler() {
    signOut({
      redirect: false,
    });
  }

  return (
    <header className="header">
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
          {session && (
            <li>
              <span>Welcome back, {getFirstName(session.user.name)}</span>
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
