const baseurl = process.env.NEXT_PUBLIC_API_URL;

export const productAPI = async () => {
    const res = await fetch(`${baseurl}/products`);
    const data = res.json();
    return data;
}