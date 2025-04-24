

import {
  PencilSquareIcon,
  TrashIcon,
  // FolderPlusIcon
} from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { LangContext } from '../context/LangContext'

const demoDocuments =[
  {id: 1, name: 'RIMI Canuck Voyage Travel Medical - Claim Form (EN)'},
  {id: 2, name: 'RIMI Canuck Voyage Travel Medical - Claim Form (FR)'},
  {id: 3, name: 'Secure Study RIMI International Students to Canada - Policy Wording (EN)'},
  {id: 4, name: 'Secure Study RIMI International Students to Canada - Policy Wording (FR)'},
]


export default function Documents() {
  
  const { langauge } = useContext(LangContext)


  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className=" max-w-5xl mt-10 px-10 py-10 shadow-[0px_3px_9.7px_#0000001C]">

        {demoDocuments.map((item) => (
          <div key={item.id} className=" flex justify-between items-center  py-2  w-full font-[inter]">
          {item.name}
          <div className='flex justify-center items-center gap-2'>
          <button className=" px-2 py-2 text-[#2B00B7] shadow-2xl flex gap-2 cursor-pointer"><PencilSquareIcon className="h-6 w-6" aria-hidden="true" /> </button>
          <button className=" px-2 py-2 text-[#2B00B7] shadow-2xl flex gap-2 cursor-pointer"><TrashIcon className="h-6 w-6" aria-hidden="true" /> </button>
          </div>
      </div>
        ))}

        

      </div>

      <div className=' mt-5 flex justify-center items-center'>
      <button className=" w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]"> { langauge === 'En' ? 'Add' : 'AJOUTER'} </button>
      </div>
    </div>
  )
}
