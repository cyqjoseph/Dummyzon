import { useRef } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

async function changePasswordHandler(passwordData) {
  const response = await fetch("/api/user-settings/change-password", {
    method: "PATCH",
    body: JSON.stringify(passwordData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
}

function ChangePasswordForm(props) {
  const [session, loading] = useSession();
  const router = useRouter();
  if (!session) {
    router.replace("/browse");
  }
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    const result = await changePasswordHandler({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
    console.log(result);
  }
  return (
    <form className="change-password" onSubmit={submitHandler}>
      <div>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          required
          ref={oldPasswordRef}
        />
      </div>
      <div>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          ref={newPasswordRef}
        />
      </div>
      <div>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
