import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { addEmployeeApi, deleteEmployeeApi, editEmployeeApi, viewEmployeeApi } from '../server/allApi'
import { toast } from 'react-toastify'

const Home = () => {
    const [allemployee,setAllEmployee]=useState([])
    const [editEmployee,setEditEmployee]=useState({name:"",email:"",position:"",department:"",salary:"",_id:""})
    console.log(editEmployee)
    console.log(allemployee)
    const [showModal,setshowModal]=useState(false)
    const [showEditModal,setshowEditModal]=useState(false)
    const [formData,setFormData]=useState({name:"",email:"",position:"",department:"",salary:""})

   
    const handleClose=()=>{
        setshowModal(false)
        
    }

    const handleEdit=(employe)=>{
        setshowEditModal(true)
        setEditEmployee({name:employe.name,email:employe.email,position:employe.position,department:employe.department,salary:employe.salary,_id:employe._id})
    }
    
    const handleCancel=()=>{
        setshowModal(false)
    }
    const handleEditClose=()=>{
        setshowEditModal(false)
        
    }
    
    const handleEditCancel=()=>{
        setshowEditModal(false)
    }
    
    const getAllEmployee=async()=>{
        try {
            const result=await viewEmployeeApi()
            console.log(result.data.data)
            
            setAllEmployee(result.data.data)
            
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleAdd=async()=>{
        try {

            if(!formData.name||!formData.email||!formData.position||!formData.department||!formData.salary){
                return toast.warning('fill your  required fields')
            }
            const res=await addEmployeeApi(formData)
            if(res.status==200){
                setshowModal(false)
                toast.success('successfully new Employee')
               getAllEmployee()
                
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleEditAdd=async()=>{
        try {
            const res=await editEmployeeApi(editEmployee._id,editEmployee)
            if(res.status==200){
                setshowEditModal(false)
                toast.success('successfully Edited Employee')
               getAllEmployee()
                
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlDelete=async(empId)=>{
        try {
            const res=await deleteEmployeeApi(empId)
            if(res.status==200){
                toast.success('successfully deleted employee')
                getAllEmployee()
            }
            
        } catch (err) {
           console.log(err) 
        }
    }

    useEffect(()=>{
        getAllEmployee()
    },[])

  return (
    <div>
        <Header/>

        <div className='bg-gray-500 p-6 m-6 rounded-2xl flex justify-center'>
            <h1 className='text-xl text-white font-bold'>All Employee Details</h1>
        </div>

        <div className='my-5 m-6 p-6 bg-gray-300 rounded-2xl'>

        <div>
            <div className='flex justify-end my-3'>
                <button className='bg-green-800 p-2 px-5 text-white rounded-lg ' onClick={()=>setshowModal(true)}>Add</button>
            </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 '>
           {allemployee.length>0? allemployee.map((employee)=>(
            <div className='bg-gray-100 shadow-lg rounded-lg p-4'>

            <h1>Name: <span className='text-blue-800'>{employee.name}</span></h1>
            <h3>Email:<span className='text-blue-800'>{employee.email}</span></h3>
            <h3>Position:<span className='text-blue-800'></span>{employee.position}</h3>
            <h1>department: <span className='text-blue-800'></span>{employee.department}</h1>
            <h1>salary: <span className='text-blue-800'></span>{employee.salary}</h1>

            <div className='my-2 flex gap-3'>
                <button className='bg-red-600 text-white w-full py-2 rounded-lg shadow-lg' onClick={()=>handlDelete(employee._id)}>
                    Delete
                </button>
                <button className='bg-green-800 text-white w-full py-2 rounded-lg shadow-lg' onClick={()=>handleEdit(employee)}>
                    edit
                </button>

            </div>
            
        </div>
           )) : <p className='text-red-500 text-center '>there is no employee yet</p>}

          </div>
        </div>
        </div>


        {showModal && <div id="my_modal_3" className="modal modal-open">
          <div className="modal-box max-w-150 h-100 flex flex-col justify-center gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>handleClose()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg my-4 ">employe  Details</h3>
            <div className="modal-data flex flex-col sm:flex-row gap-6 ">

             
              <div className="modaltext flex flex-col justify-evenly  w-full gap-2">
              <input type="text" placeholder="name" className="input w-full" onChange={(e)=>setFormData({...formData,name:e.target.value})}  />
              <input type="text" placeholder="email" className="input w-full" onChange={(e)=>setFormData({...formData,email:e.target.value})}   />
              <input type="text" placeholder="position" className="input w-full" onChange={(e)=>setFormData({...formData,position:e.target.value})}   />
              <input type="text" placeholder="department" className="input w-full"  onChange={(e)=>setFormData({...formData,department:e.target.value})}  />
              <input type="text" placeholder="salary" className="input w-full"  onChange={(e)=>setFormData({...formData,salary:e.target.value})}  />
         
              
                

               
              </div>
            </div>

             <div className="buttons flex gap-3 text-white">
                  <button className="bg-black p-2 px-3 w-full hover:bg-red-600  transition-all duration-300 " onClick={handleCancel}>
                    cancel
                  </button>
                  <button className="bg-white text-black outline hover:bg-green-900 hover:text-white transition-all duration-300 p-2 px-3 w-full " onClick={handleAdd}>
                    add
                  </button>
                </div> 
          </div>
        </div>}

        {showEditModal && <div id="my_modal_3" className="modal modal-open">
          <div className="modal-box max-w-150 h-100 flex flex-col justify-center gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>handleEditClose()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg my-4 "> edit employe  Details</h3>
            <div className="modal-data flex flex-col sm:flex-row gap-6 ">

             
              <div className="modaltext flex flex-col justify-evenly  w-full gap-2">
              <input type="text" placeholder="name" className="input w-full" value={editEmployee.name} onChange={(e)=>setEditEmployee({...editEmployee,name:e.target.value})}   />
              <input type="text" placeholder="position" className="input w-full" value={editEmployee.position} onChange={(e)=>setEditEmployee({...editEmployee,position:e.target.value})}   />
              <input type="text" placeholder="department" className="input w-full"  value={editEmployee.department} onChange={(e)=>setEditEmployee({...editEmployee,department:e.target.value})}   />
              <input type="text" placeholder="salary" className="input w-full" value={editEmployee.salary} onChange={(e)=>setEditEmployee({...editEmployee,salary:e.target.value})}   />
         
              
                

               
              </div>
            </div>

             <div className="buttons flex gap-3 text-white">
                  <button className="bg-black p-2 px-3 w-full hover:bg-red-600  transition-all duration-300 " onClick={handleEditCancel}>
                    cancel
                  </button>
                  <button className="bg-white text-black outline hover:bg-green-900 hover:text-white transition-all duration-300 p-2 px-3 w-full " onClick={()=>handleEditAdd(editEmployee._id)}>
                    edit
                  </button>
                </div> 
          </div>
        </div>}

    </div>
  )
}

export default Home