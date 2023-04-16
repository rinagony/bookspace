export const getAllProducts = async () => {
    await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(console.log);
}