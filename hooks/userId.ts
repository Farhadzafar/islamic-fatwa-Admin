export function getUserId(): string {
  const userString = localStorage.getItem("user");
  if (!userString) throw new Error("User not found in localStorage");

  try {
    const userObject = JSON.parse(userString);
    const userId = userObject?.user?._id;

    if (!userId) throw new Error("User ID not found in user object");
    return userId;
  } catch (error) {
    throw new Error("Invalid user data in localStorage");
  }
}
