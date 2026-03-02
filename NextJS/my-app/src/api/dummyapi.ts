export const userData = async () => {
    const res = await fetch("https://dummyjson.com/users");

    const user = await res.json();
    return user.users;
}