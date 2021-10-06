import { hash, compare } from "bcryptjs";

export async function hashPassword(pwd) {
  const hashedPassword = await hash(pwd, 12);
  return hashedPassword;
}

export async function verifyPassword(pwd, hashedPwd) {
  const isValid = await compare(pwd, hashedPwd);

  return isValid;
}

export async function createAccount(name, email, password) {
  //fetching from server side backend
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function getFirstName(name) {
  return name.split(" ")[0];
}

export function notificationMessage(requestStatus, title, message) {
  return {
    status: requestStatus,
    title: title,
    message: message,
  };
}
