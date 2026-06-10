import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CamperProfile() {
    const { id } = useParams();
    const [camper, setCamper] = useState(null);
    const [parent, setParent] = useState(null);
    const [genders, setGenders] = useState([]);
    const [bunks, setBunks] = useState([]);

    useEffect(() => {
        if (!id) {
            return
        };

        fetch(`http://localhost:5227/api/campers/${id}`)
            .then(response => response.json())
            .then(setCamper)
            .catch(error => console.error('Error fetching camper:', error));

        fetch(`http://localhost:5227/api/CamperParent/camper/${id}`)
            .then(async (res) => {
                if (!res.ok) return null;
                return await res.json();
            })
            .then(data => {
                setParent(data);
            })
            .catch(err => console.error("Error fetching parent:", err));

        fetch(`http://localhost:5227/api/Genders`)
            .then(response => response.json())
            .then(data =>
                setGenders(data));
            
        fetch(`http://localhost:5227/api/Bunks`)
            .then(response => response.json())
            .then(data =>
                setBunks(data));

            
    }, [id]);

    if (!camper) {
        return <div>Loading...</div>;
    }

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
                                    <a href="/" aria-current="page" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</a>
                                    <a href="/campers" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Campers</a>
                                    <a href="/mar" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">MAR</a>
                                    <a href="/reports" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Reports</a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                        <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Camper Profile</h1>
                </div>
            </header>



            <main className="bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


                    <form>
                        <div className="space-y-12 text-white">
                            <div className="border-b border-white/10 pb-12">
                                <h2><strong>{camper.firstName} {camper.lastName}</strong></h2>
                                <p><strong>First Name: </strong>{camper.firstName}</p>
                                <p><strong>Last Name: </strong>{camper.lastName}</p>

                                 
                                <p><strong>Gender: </strong>{genders.find(g => g.genderId === camper.genderId)?.genderName}</p>
                                <p><strong>Date of Birth: </strong>{camper.dateOfBirth}</p>
                                <p><strong>Bunk: </strong>{bunks.find(b => b.bunkId === camper.bunkId)?.bunkName}</p>
                                <p><strong>Parent Name: </strong>{parent?.parentFirstName}</p>
                                <p><strong>Last Name: </strong>{parent?.parentLastName}</p>
                                <p><strong>Phone Number: </strong>{parent?.phoneNumber}</p> </div>
                        </div>

                        <div>
                            <Link to="/addMedication"><button type="button" className="absolute right-4 bottom-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Add Medication
                            </button></Link>
                        </div>

                        
                    </form>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <Link to={`/editCamper/${camper.camperId}`}><button type="button" className="absolute left-4 bottom-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Edit Camper
                        </button></Link>
                    </div>
                </div>
            </main>
        </div>
                
            
        

    )
    
}