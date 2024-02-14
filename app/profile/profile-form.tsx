// 'use client'
// import { useState } from "react";
// import { useRouter } from "next/navigation"

// const ProfileForm = () => {
//     const router = useRouter()

//     const [displayName, setDisplayName] = useState('')
//     const [birthday, setBirthday] = useState('')
//     const [gender, setGender] = useState('')
//     const [passion, setPassion] = useState([])
//     const [isLoading, setIsLoading] = useState(false)

//     const handleSubmit = async (e)  => {
//         e.preventDefault()
//         setIsLoading(true)
    
//         const newProfile = { displayName, birthday, gender, passion }
    
//         const res = await fetch('http://localhost:4000/tickets', {
//           method: "POST",
//           headers: {"Content-Type": "application/json"},
//           body: JSON.stringify(newTicket)
//         })
    
//         if (res.status === 201) {
//           router.refresh()
//           router.push('/tickets')
//         }
        
//       }
    
//       const validateInput = () => {
    
//       }

//     return (
//         <form className="mt-10 flex flex-row w-full h-full">
//             <div className="w-1/2">
//                   <div className='input-group top-label'>
//                       <label htmlFor='displayName'>Display Name</label>
//                       <input id='displayName' />
//                   </div>
//                   <div className='input-group top-label'>
//                       <label htmlFor='Birthday'>Birthday</label>
//                       <input id='Birthday' />
//                   </div>  
//                   <div>
//                       <label>Gender</label>
//                   </div>
//                   <div>
//                       <label>Passion</label>
//                   </div>
//               </div>
//               <div className="w-1/2">
//                   <div>Profile Photo</div>
//               </div>

//               <button 
//         className="btn-primary" 
//         disabled={isLoading}
//       >
//       {isLoading && <span>Adding...</span>}
//       {!isLoading && <span>Add Ticket</span>}
//     </button>
//       </form>
//     );
//   };

 
  
//   export default ProfileForm;
  