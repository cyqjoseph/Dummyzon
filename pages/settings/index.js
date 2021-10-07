import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { getSession } from "next-auth/client";
import Countries from "../../lib/countries";
async function updateInformationHandler(updatedData) {
  const response = await fetch("/api/user-settings/settings", {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}

function Settings() {
  const [userEmail, setUserEmail] = useState();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const countryInputRef = useRef();
  const phoneInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const router = useRouter();
  Promise.resolve(getSession()).then(function (result) {
    setUserEmail(result.user.email);
  });
  // console.log(router);

  const path = router.pathname;

  async function submitHandler(e) {
    e.preventDefault();
    const enteredFirstName = firstNameInputRef?.current?.value;
    const enteredLastName = lastNameInputRef?.current?.value;
    const enteredCountry = countryInputRef?.current?.value;
    const enteredPhone = phoneInputRef?.current?.value;
    const enteredCity = cityInputRef?.current?.value;
    const enteredAddress = addressInputRef?.current.value;

    try {
      await updateInformationHandler({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        country: enteredCountry,
        phone: enteredPhone,
        city: enteredCity,
        address: enteredAddress,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="profileContainer">
      <form className="profile" onSubmit={submitHandler}>
        <h1>Personal Settings</h1>
        <div className="profile__name">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            placeholder="First Name"
            ref={firstNameInputRef}
          />
        </div>
        <div className="profile__name">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            placeholder="Last Name"
            ref={lastNameInputRef}
          />
        </div>
        <h1>Account Settings</h1>
        <div className="profile__email">
          <span className="profile__email-name">Email</span>
          <span className="profile__email-text">{userEmail}</span>
        </div>
        <div className="profile__password">
          <span className="profile__password-name">Change Password &nbsp;</span>
          <span className="profile__password-link">
            <Link href={`${path}/change-password`}>Change Password</Link>
          </span>
        </div>
        <Countries reference={countryInputRef} />
        <div className="profile__telephone">
          <label htmlFor="phone-number" className="profile__telephone-name">
            Phone number
          </label>
          <input
            id="phone-number"
            type="tel"
            className="profile__telephone-number"
            ref={phoneInputRef}
          />
        </div>
        <div className="profile__address">
          <div className="profile__address-city">
            <label htmlFor="city" className="profile__address-city-text">
              City
            </label>
            <input id="city" type="text" ref={cityInputRef}></input>
          </div>
          <div className="profile__address-address">
            <label htmlFor="address" className="profile__address-city-text">
              Address
            </label>
            <input
              id="address"
              rows="2"
              type="text"
              ref={addressInputRef}
            ></input>
          </div>
        </div>

        <div>
          <button className="profile__submit">Save Changes</button>
        </div>
      </form>
    </section>
  );
}

export default Settings;
