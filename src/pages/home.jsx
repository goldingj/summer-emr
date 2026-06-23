import { useEffect, useState } from "react";


export default function Home() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/NursePosts')
            .then((response) => response.json())
            .then((data) =>
                setPosts(data || []))
            .catch(() => setPosts([]));
            
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { nurseMessage: message };

        const response = await fetch('https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/NursePosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
            const saved = await response.json();
            setPosts([saved, ...posts]);
            setMessage("");
        }
    };


    return (

        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="size-8" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    { /*Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white"*/ }
                                    <a href="/" aria-current="page" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</a>
                                    <a href="/campers" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Campers</a>
                                    <a href="/mar" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">MAR</a>
                                    <a href="/reports" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Reports</a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
        
     

            <main className="bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {posts.map(post => (
                        <div key={post.nursePostId} className="bg-gray-100 p-3 mb-2 rounded">
                            <p className="font-semibold">{post.nurseMessage}</p>
                            <small>{new Date(post.createdAt).toLocaleString()}</small>
                            
                        </div>
                    )) }
                    <div>
                        <textarea
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            placeholder="Write your post here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSubmit}
                                className="bg-indigo-500 text-white px-4 py-2 rounded">Post</button>
                    </div>
            </div>
        </main>
        </div>
    )
}
                        
