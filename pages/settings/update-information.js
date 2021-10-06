import { useRef, useState } from "react";
import Notification from "../../components/ui/notification";
import { notificationMessage } from "../../lib/helper";
async function updateInformationHandler(updatedData) {
  const response = await fetch("/api/user-settings/update-information", {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}

function UpdateInformationForm() {
  const [requestStatus, setRequestStatus] = useState();
  // pending, success, error
  const [requestError, setRequestError] = useState();
  const nameInputRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    setRequestStatus("pending");
    const newName = nameInputRef?.current?.value;

    try {
      await updateInformationHandler({
        newName: newName,
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
      "Updated successfully!"
    );
  } else if (requestStatus === "error") {
    notification = notificationMessage(
      "error",
      "There was an error",
      requestError
    );
  }

  return (
    <section>
      <form className="dummy" onSubmit={submitHandler}>
        <div>
          <label htmlFor="new-name">Update Name</label>
          <input
            id="new-name"
            type="text"
            placeholder="Name"
            ref={nameInputRef}
          />
        </div>
        <div>
          <button>Save</button>
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

export default UpdateInformationForm;
