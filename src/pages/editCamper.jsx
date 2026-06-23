import {useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";

export default function EditCamper() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genders, setGenders] = useState([]);
    const [genderId, setGenderId] = useState("");
    const [allergyOptions, setAllergyOptions] = useState([]);
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [bunks, setBunks] = useState([]);
    const [bunkId, setBunkId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [parentFirstName, setParentFirstName] = useState("");
    const [parentLastName, setParentLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const response = await fetch(`https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/campers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, allergyIds: selectedAllergies, genderId, bunkId, dateOfBirth, parentFirstName, parentLastName, phoneNumber })
        })

        if (!response.ok) {
            const error = await response.text();
            alert(error);
            return;
        }

        if (response.ok) {
            alert("Camper updated successfully!");
            navigate("/campers");
        }


        alert("Camper updated successfully!");
    };

    const handleDelete = async () => {
        const confirm = window.confirm(
            "Are you sure you want to delete this camper?"
        );

        if (!confirm) return;

        const response = await fetch(`https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/campers/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Camper deleted successfully");

            navigate("/campers");
        }
    };
    
    useEffect(() => {
        fetch(`https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/campers/${id}`)
            .then(response => response.json())
            .then(data => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setDateOfBirth(data.dateOfBirth?.split("T")[0]);

                setGenderId(
                    data.genderId ??
                    data.gender?.genderId ??
                    ""
                );

                setBunkId(
                    data.bunkId ??
                    data.bunk?.bunkId ??
                    ""
                );

                setSelectedAllergies(
                    data.allergies?.map(a => a.allergyId) ?? []
                );
            });

        fetch(`https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/CamperParent/camper/${id}`)
            .then(response => response.json())
            .then(data => {
                setParentFirstName(data.parentFirstName);
                setParentLastName(data.parentLastName);
                setPhoneNumber(data.phoneNumber);
            });
        fetch("https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/genders")
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch genders");
                }
                return response.json();
            })
            .then(data => {
                const list = Array.isArray(data) ? data : data.data;
                setGenders(list || []);
            })
            .catch(error => { console.error(error) });


        fetch("https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/allergies")
            .then(response => response.json())
            .then(setAllergyOptions);

       

        fetch("https://https://krb11kwl6k.execute-api.us-east-1.amazonaws.com/api/bunks")
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch bunks");
                }
                return response.json();
            })
            .then(data => {
                const list = Array.isArray(data) ? data : data.data;
                setBunks(list || []);
            })
            .catch(error => { console.error(error) });

            
    }, [id]);

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
                            
                        </div>
                    </div>

                </div>
            </div>
            </nav>
        

        <header className="relative bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Camper</h1>
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

                                <div>
                                    <strong className = "text-white">Allergies:</strong>

                                    {allergyOptions.map(a => (
                                        <label key={a.allergyId} style = {{ display: "block" }} className = "text-white">
                                            <input type="checkbox" checked={selectedAllergies.includes(a.allergyId)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedAllergies(previous => [...previous, a.allergyId]);
                                                    } else {
                                                        setSelectedAllergies(previous =>
                                                            previous.filter(id => id !== a.allergyId)
                                                        );
                                                    }
                                                }}
                                                />
                                                {a.allergy}
                                        </label>
                                    )) }
                                </div>

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
                                    {Array.isArray(genders) && genders.map((gender) => (
                                        <option className="text-gray-900"
                                            key={gender.genderId}
                                            value={gender.genderId}>
                                            {gender.genderName}
                                        </option>
                                    ))}

                                </select>

                                <label htmlFor="bunk" className="block text-sm/6 font-medium text-white">Bunk</label>
                                <select
                                    value={bunkId}
                                    onChange={(e) => setBunkId(e.target.value)}
                                    className="mt-2 block  rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                                    <option value="">Select Bunk</option>
                                    {Array.isArray(bunks) && bunks.map((bunk) => (
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
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                            <button type = "button" onClick={handleDelete} className="absolute left-4 bottom rounded-md bg-red-600 px-3 py-2 text-white">
                                Delete Camper
                            </button>
                        </div>
                    </form>


                </div>
            </main>
      </div>
   )
}
