import { useEffect, useState } from "react";

export default function ApiTest() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();

                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ul>
            {data.slice(0, 5).map(item => (
                <li key={item.id}>
                    {item.title}
                </li>
            ))}
        </ul>
    );
}