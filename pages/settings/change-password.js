import { useRef, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Notification from "../../components/ui/notification";
import { notificationMessage } from "../../lib/helper";
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
  const [requestStatus, setRequestStatus] = useState();
  // pending, success, error
  const [requestError, setRequestError] = useState();
  const [session, loading] = useSession();
  const router = useRouter();
  if (!session) {
    router.replace("/browse");
  }
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    setRequestStatus("pending");
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    try {
      await changePasswordHandler({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });
      setRequestStatus("success");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;
  if (requestStatus === "pending") {
    notification = notificationMessage(
      "pending",
      "Sending request",
      "Request pending"
    );
  } else if (requestStatus === "success") {
    notification = notificationMessage(
      "success",
      "Success!",
      "Password updated successfully!"
    );
  } else if (requestStatus === "error") {
    notification = notificationMessage(
      "error",
      "There was an error in updating",
      requestError
    );
  }
  return (
    <section>
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
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ChangePasswordForm;
