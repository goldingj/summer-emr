import { Link } from 'react-router-dom';

export default function Home() {
    return(
    <div className='h-screen flex flex-col items-center justify-center gap-6 mt-auto'>
        <div className='flex gap-50 mt-auto'>
                <Link to="/campers"><button type="button" className='bg-gray-500 px-8 py-4 rounded-sm'>Campers</button></Link>
                <Link to="/reports"><button type="button" className='bg-gray-500 px-8 py-4 rounded-sm'>Reports</button></Link>
        </div>
            <button type="button" className='bg-black text-white px-4 py-2 rounded-sm absolute left-335 bottom-137'>+</button>
        <div className='bg-gray-500/25 flex-initial w-5/6 min-h-150 rounded-sm'></div>
    
        </div>
    )
}