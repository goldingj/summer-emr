import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AddCamper() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genders, setGenders] = useState([]);
    const [genderId, setGenderId] = useState("");
    const [bunks, setBunks] = useState([]);
    const [bunkId, setBunkId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [parentFirstName, setParentFirstName] = useState("");
    const [parentLastName, setParentLastName] = useState("");
    const [parentPhone, setParentPhone] = useState("");

    useEffect(() => {
        fetch("http://localhost:5227/api/gender")
            .then(response => response.json())
            .then(data => setGenders(data))
            .catch(error => console.error("Error fetching genders:", error));

        fetch("http://localhost:5227/api/bunks")
            .then(response => response.json())
            .then(data => setBunks(data))
            .catch(error => console.error("Error fetching bunks:", error));
    }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();

            const camperData = {
                firstName,
                lastName,
                genderId,
                bunkId,
                dateOfBirth
            };

            const parentData = {
                firstName: parentFirstName,
                lastName: parentLastName,
                phoneNumber: parentPhone
            };

            const camperResponse = await fetch("http://localhost:5227/api/campers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(camperData)
            });

            const savedCamperInfo = await camperResponse.json();
            console.log(savedCamperInfo);


            const parentResponse = await fetch("http://localhost:5227/api/parents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(parentData)
            });

            const savedParentInfo = await parentResponse.json();


            console.log(savedParentInfo);
            console.log(savedCamperInfo);
            await fetch("http://localhost:5227/api/CamperParent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    camperId: savedCamperInfo.camperId,
                    parentId: savedParentInfo.parentId
                })


            });
            alert("Camper added successfully!");
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
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Camper</h1>
                    </div>
                </header>



                <main className="bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


                        <form>
                            <div className="space-y-12">
                                <div className="border-b border-white/10 pb-12">
                                    <label htmlFor="firstName" className="block text-sm/6 font-medium text-white">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Jane"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />


                                    <label htmlFor="lastName" className="block text-sm/6 font-medium text-white">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Smith"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />

                                    <label htmlFor="dob" className="block text-sm/6 font-medium text-white">Date of Birth</label>
                                    <input type="date"
                                        name="dob"
                                        id="dob"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="mt-2 block  rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />

                                    <label htmlFor="gender" className="block text-sm/6 font-medium text-white">Gender</label>
                                    <select
                                        value={genderId}
                                        onChange={(e) => setGenderId(e.target.value)}
                                        className="mt-2 block  rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                                        <option value="">Select Gender</option>
                                        {genders.map((gender) => (
                                            <option className="text-gray-900"
                                                key={gender.genderId}
                                                value={gender.genderId}>
                                            </option>
                                        ))}

                                    </select>

                                    <label htmlFor="bunk" className="block text-sm/6 font-medium text-white">Bunk</label>
                                    <select
                                        value={bunkId}
                                        onChange={(e) => setBunkId(e.target.value)}
                                        className="mt-2 block  rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                                        <option value="">Select Bunk</option>
                                        {bunks.map((bunk) => (
                                            <option className="text-gray-900"
                                                key={bunk.bunkId}
                                                value={bunk.bunkId}>
                                                {bunk.bunkName}
                                            </option>
                                        ))}

                                    </select>

                                    <label htmlFor="parentFirst" className="block text-sm/6 font-medium text-white">
                                        Parent First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="parentFirst"
                                        id="parentFirst"
                                        value={parentFirstName}
                                        onChange={(e) => setParentFirstName(e.target.value)}
                                        placeholder="John"
                                        className="mt-2 block w-1/2 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />

                                    <label htmlFor="parentLast" className="block text-sm/6 font-medium text-white">
                                        Parent Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="parentLast"
                                        id="parentLast"
                                        value={parentLastName}
                                        onChange={(e) => setParentLastName(e.target.value)}
                                        placeholder="Smith"
                                        className="mt-2 block w-1/2 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />

                                    <label htmlFor="phone" className="block text-sm/6 font-medium text-white">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={parentPhone}
                                        onChange={(e) => setParentPhone(e.target.value)}
                                        placeholder="(123) 456-7890"
                                        className="mt-2 block rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link to="/campers"><button type="button" className="text-sm/6 font-semibold text-white">
                                    Cancel
                                </button></Link>
                                <button onClick={handleSubmit}
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </form>


                    </div>
                </main>
            </div>

        )
    }

