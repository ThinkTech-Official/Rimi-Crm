

import {
  PencilSquareIcon,
  TrashIcon,
  FolderPlusIcon
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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">{ langauge === 'En' ? 'DOCUMENTS' : 'DOCUMENTATION'}</h2>
      <div className=" max-w-4xl mt-10">

        {demoDocuments.map((item) => (
          <div className=" flex justify-between items-center border-b py-2 border-slate-200 w-full">
          {item.name}
          <div className='flex justify-center items-center gap-2'>
          <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><PencilSquareIcon className="h-6 w-6" aria-hidden="true" /> </button>
          <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><TrashIcon className="h-6 w-6" aria-hidden="true" /> </button>
          </div>
      </div>
        ))}

        

      </div>

      <div className=' mt-5 flex justify-center items-center'>
      <button className=" px-2 py-2 border border-slate-400 shadow-2xl flex gap-2 cursor-pointer"><FolderPlusIcon className="h-6 w-6" aria-hidden="true" /> { langauge === 'En' ? 'ADD' : 'AJOUTER'} </button>
      </div>
    </div>
  )
}
