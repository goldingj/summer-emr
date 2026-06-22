import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Campers() {

    const [campers, setCampers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const filteredCampers = campers.filter((c) =>
        `${c.firstName} ${c.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch("https://summer-camp-emr-env.eba-ybkpfisp.us-east-1.elasticbeanstalk.com/api/campers")
            .then(response => response.json())
            .then(data => setCampers(data))
            .catch(error => console.error("Error fetching campers:", error));
    }, []);

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
                                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}
                                    <a href="/" aria-current="page" className="rounded-md text-gray-300 px-3 py-2 text-sm font-medium hover:bg-white/5 hover:text-white">Home</a>
                                    <a href="/campers" className="rounded-md bg-gray-900 text-white px-3 py-2 text-sm font-medium ">Campers</a>
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Campers</h1>
                    <input type="text" placeholder="Search for camper..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="absolute top-4 right-40 mb-4 p-2 rounded border" />
                    <Link to="/addCamper"><button type="button" className="absolute right-4 top-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add Camper
                    </button></Link>   
                </div>
            </header>



            <main className="bg-gray-800 h-screen">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-white">



                    {filteredCampers.map((c) => (
                        <div key={c.camperId}>
                            <Link to={`/campers/${c.camperId}`}>
                                {c.lastName}, {c.firstName}
                            </Link>
                        </div>
                    ))}


                </div>
            </main>
        </div>
    )
}

