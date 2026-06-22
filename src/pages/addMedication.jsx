import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function AddMedication() {
    const { camperId } = useParams();
    const navigate = useNavigate();
    const [medications, setMedications] = useState([]);
    const [medicationId, setMedicationId] = useState('');
    const [dosage, setDosage] = useState('');
    const [doseUnit, setDoseUnit] = useState('');
    const [frequency, setFrequency] = useState('');
    const [specialInstructions, setInstructions] = useState('');

    useEffect(() => {
        fetch('http://summer-camp-emr-env.eba-ybkpfisp.us-east-1.elasticbeanstalk.com/api/Medications')
                .then(response => response.json())
                .then(data => setMedications(data))
                .catch(error => console.error('Error fetching medications:', error));

        }, []);


        const handleSubmit = async (e) => {
            e.preventDefault();

            const medicationData = {
                camperId: parseInt(camperId),
                medicationId: parseInt(medicationId),
                dosage,
                dosageUnit: doseUnit,
                frequency,
                instructions: specialInstructions
            };

            const response = await fetch('http://summer-camp-emr-env.eba-ybkpfisp.us-east-1.elasticbeanstalk.com/api/CamperMedications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medicationData)
            });

            if (response.ok) {
                alert('Medication added successfully!');
                navigate(`/campers/${camperId}`);
            } else {
                alert('Failed to add medication. Please try again.');
            }

        };

        return (
            <div>
                < header className="relative bg-white shadow-sm" >
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Medication</h1>
                    </div>
                </header >



                <main className="bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


                        <form onSubmit={handleSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-white/10 pb-12">
                                    <label htmlFor="medName" className="block text-sm/6 font-medium text-white">
                                        Medication Name
                                    </label>
                                    <select value={medicationId} onChange={(e) => setMedicationId(e.target.value)} className = "text-white">
                                        <option className="bg-gray-900 text-gray-400" value="">Select Medication</option>
                                        {medications.map((medication) => (
                                            <option key={medication.medicationId} className="bg-gray-900 text-white" value={medication.medicationId}>
                                                {medication.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="dosage" className="block text-sm/6 font-medium text-white">
                                        Dosage
                                    </label>
                                    <input
                                        type="text"
                                        name="dosage"
                                        id="dosage"
                                        placeholder="Dosage"
                                        value={dosage}
                                        onChange={(e) => setDosage(e.target.value)}
                                        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />

                                    <label htmlFor="doseUnit" className="block text-sm/6 font-medium text-white">
                                        Dose Unit </label>
                                    <select
                                        name="doseUnit"
                                        id="doseUnit"
                                        value={doseUnit}
                                        onChange={(e) => setDoseUnit(e.target.value)}
                                        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    >
                                        <option className="bg-gray-900" value="">Select Dose Unit</option>
                                        <option className="bg-gray-900" value="mg">mg</option>
                                        <option className="bg-gray-900" value="ml">ml</option>
                                        <option className="bg-gray-900" value="g">g</option>
                                        <option className="bg-gray-900" value="tablet">tablet</option>
                                        <option className="bg-gray-900" value="capsule">capsule</option>
                                    </select>

                                    <label htmlFor="frequency" className="block text-sm/6 font-medium text-white">Frequency</label>
                                    <select name="frequency"
                                        name="frequency"
                                        id="frequency"
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    >
                                        <option className="bg-gray-900" value="">Select Frequency</option>
                                        <option className="bg-gray-900" value="once">QD</option>
                                        <option className="bg-gray-900" value="daily">BID</option>
                                        <option className="bg-gray-900" value="weekly">TID</option>
                                        <option className="bg-gray-900" value="monthly">QID</option>
                                        <option className="bg-gray-900" value="as needed">PRN</option>
                                    </select>

                                    <label htmlFor="specialInstructions" className="block text-sm/6 font-medium text-white">
                                        Special Instructions </label>
                                    <input type="text" name="specialInstructions" id="specialInstructions" value={specialInstructions} onChange={(e) => setInstructions(e.target.value)} className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />

                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link to="/campers"><button type="button" className="text-sm/6 font-semibold text-white">
                                    Cancel
                                </button></Link>
                                <button
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
