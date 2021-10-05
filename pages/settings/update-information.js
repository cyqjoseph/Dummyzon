import { useRef } from "react";

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
  const nameInputRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    const newName = nameInputRef?.current?.value;

    const result = await updateInformationHandler({
      newName: newName,
    });
    console.log(result);
  }
  return (
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
      {/* <div>
        <label htmlFor="new-email">Update Email</label>
        <input
          id="new-email"
          type="email"
          placeholder="Email"
          ref={emailInputRef}
        />
      </div> */}
      <div>
        <button>Save</button>
      </div>
    </form>
  );
}

export default UpdateInformationForm;
