import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { getSession } from "next-auth/client";
import Countries from "../../lib/countries";
function Settings() {
  const [userEmail, setUserEmail] = useState();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const router = useRouter();
  Promise.resolve(getSession()).then(function (result) {
    setUserEmail(result.user.email);
  });
  console.log(router);
  const path = router.pathname;
  return (
    <form className="dummy">
      <div>
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          placeholder="First Name"
          ref={firstNameInputRef}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          placeholder="Last Name"
          ref={lastNameInputRef}
        />
      </div>
      <div>
        <span>Email &nbsp;</span>
        <span>{userEmail}</span>
      </div>
      <div>
        Change Password &nbsp;
        <Link href={`${path}/change-password`}>Change Password</Link>
      </div>
      <div>
        Country &nbsp; <Countries />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input id="city" type="text"></input>
      </div>
      <div>
        <label htmlFor="phone-number">Phone number</label>
        <input id="phone-number" type="tel" />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input id="address" rows="2" type="text"></input>
      </div>
    </form>
  );
}

export default Settings;
