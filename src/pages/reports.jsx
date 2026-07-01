import { /*useEffect, */useState } from "react";

export default function Reports() {

    const [activeReport, setActiveReport] = useState(null);
    const [data, setData] = useState([]);


    const loadCampersByBunk = async () => {
        const response = await fetch("https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/Reports/campers-by-bunk");
        if (!response.ok) {
            const text = await response.text();
            console.error("error:", response.status, text);
            return;
        }
        const json = await response.json();
        setData(json);
        setActiveReport("bunk");
    };

    const loadAllergies = async () => {
        const response = await fetch("https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/reports/allergies");
        const json = await response.json();
        setData(json);
        setActiveReport('allergies');
    };

    const loadMedications = async () => {
        const response = await fetch("https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/reports/medications");
        const json = await response.json();
        setData(json);
        setActiveReport('meds');
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
                                    <a href="/" aria-current="page" className="rounded-md text-gray-300 px-3 py-2 text-sm font-medium  hover:bg-white/5 hover:text-white">Home</a>
                                    <a href="/campers" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Campers</a>
                                    <a href="/mar" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">MAR</a>
                                    <a href="/reports" className="rounded-md  bg-gray-900 px-3 py-2 text-sm font-medium text-white">Reports</a>
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
                </div>
            </header>



            <main className="bg-gray-900 h-screen text-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-center gap-x-6 w-full">
                        <button onClick={loadCampersByBunk} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Campers by Cabin</button>
                        <button onClick={loadAllergies} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Allergies</button>
                        <button onClick={loadMedications} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Medication Administration</button>
                    </div>


                    <div>
                        {activeReport === 'bunk' && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Camper</th>
                                        <th>Bunk</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.camperName}</td>
                                            <td>{item.bunkName}</td>
                                        </tr>
                                    )) }
                                </tbody>
                            </table>
                        )}



                        {activeReport === 'allergies' && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Camper</th>
                                        <th>Allergy</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.camperName}</td>
                                            <td>{item.allergyName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}





                        {activeReport === 'meds' && (
                            <table className="min-w-full mt-10 divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th>Camper</th>
                                        <th>Medications</th>
                                        <th>Dosage</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, i) => (
                                        <tr key={i}>
                                            <td className = "pl-44">{item.camperName}</td>
                                            <td className = "pl-44">{item.medicationName}</td>
                                            <td className = "pl-44">{item.dosage} {item.dosageUnit}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}