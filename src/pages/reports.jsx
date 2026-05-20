import { Link } from 'react-router-dom';

export default function Reports() {
    return (
        <div className='h-screen flex flex-col items-center justify-center gap-6 mt-auto'>
            <div className='flex gap-50 mt-auto'>
                <Link to="/"><button type="button" className='bg-gray-500 px-8 py-4 rounded-sm'>Home</button></Link>
                <Link to="/campers"><button type="button" className='bg-gray-500 px-8 py-4 rounded-sm'>Campers</button></Link>
            </div>

        </div>
    )
}