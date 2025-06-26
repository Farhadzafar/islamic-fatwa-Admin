export  function getUserToken(): string {
  const userString = localStorage.getItem("user");
  if (!userString) {
    throw new Error("User not found in localStorage");
  }

  try {
    const userObject = JSON.parse(userString);
    const token = userObject?.user?.token;
    if (!token) {
      throw new Error("Authentication token not found");
    }
    return token;
  } catch (error) {
    throw new Error("Failed to parse user data");
  }
}
