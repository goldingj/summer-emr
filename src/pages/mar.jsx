import { useState, useEffect } from "react";


export default function MAR() {
    const [marItems, setMarItems] = useState([]);

    const loadMAR = () => {
        fetch('https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/MAR')
            .then((response) => response.json())
            .then((data) => setMarItems(data));
    };

    useEffect(() => {
        
        loadMAR();
    }, []);

    const handleAdminister = async (camperMedicationId) => {
        const response = await fetch(`https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/MAR/administer/${camperMedicationId}`, {
            method: 'POST'
        });

        if (response.ok) {
            alert('Medication administered successfully!');
            await loadMAR();
        }
    };
        return (
            <div className="min-h-full">
                <nav className="bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="size-8" />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}
                                        <a href="/" aria-current="page" className="rounded-md text-gray-300  px-3 py-2 text-sm font-medium  hover:bg-white/5 hover:text-white">Home</a>
                                        <a href="/campers" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Campers</a>
                                        <a href="/mar" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">MAR</a>
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
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">MAR</h1>
                    </div>
                </header>



                <main className="bg-gray-900 h-screen text-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th>Camper</th>
                                    <th>Medication</th>
                                    <th>Dosage</th>
                                    <th>Frequency</th>
                                    <th>Action</th>
                                    <th>Last Administered</th>
                                </tr>
                            </thead>

                            <tbody>
                                {marItems.map(item => (
                                    <tr key={item.camperMedicationId}>
                                        <td className = "pl-20">{item.camperName}</td>
                                        <td className = "pl-20">{item.medicationName}</td>
                                        <td className = "pl-20">{item.dosage} {item.dosageUnit}</td>
                                        <td className = "pl-20">{item.frequency}</td>
                                        
                                        <td>
                                            <button className= "rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() => handleAdminister(item.camperMedicationId)}>Administer</button>
                                        </td>
                                        <td className = "pl-20">{item.lastAdministered ? new Date(item.lastAdministered).toLocaleString() : "Never"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        )
    }
