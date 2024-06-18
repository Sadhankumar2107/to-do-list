import React, { useEffect, useState } from 'react'
import notes2 from "../assets/notes2.webp"
import taskimg from "../assets/taskimg.png"
import deletebutton from "../assets/deletebutton.jpg"
import updatebutton from "../assets/updatebutton.jpeg"
import { useNavigate } from 'react-router-dom'
import { auth , db , provider } from './firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'


function Content() {
  const [Tasks,setTasks] = useState([])
  const [Newtask,setNewtask] = useState('')
  const [Edittask,setEdittask] = useState(null)

  const navigate = useNavigate()

  const [name , setName] = useState()
  const [dp , setDp] = useState()

  useEffect(()=> {

    const displayData = auth.onAuthStateChanged(user => {

      if (user) {
        setName(user.displayName )
        setDp(user.photoURL)
      }
      else{
        navigate("/")
      }

    } )

    return () => displayData()


  },[navigate] )


  const taskref = collection(db,'ToDoList')

  useEffect(() =>{
     const gettasks = async() => {
       const data = await getDocs(taskref)
       const filtereddata = data.docs.map(doc => ({...doc.data(),id:doc.id}))
       setTasks(filtereddata)
     }

     gettasks()
});



  const Inputchange = (e) => {
    setNewtask(e.target.value)
    console.log(e.target.value)
  }  
  
  const Onsubmit = async() =>{
    setNewtask('')
    if (Edittask){
      const updateref = doc(db,'ToDoList',Edittask.id)
      await updateDoc(updateref,{text:Newtask})
      setEdittask(null)}
     else {
      await addDoc(taskref,{text:Newtask,completed:false})
     }

  }

  const deletetask = async(task) =>{
    const docref = doc(db,'ToDoList',task.id)
    await deleteDoc(docref)
  }

  const updatetask = async(task) =>{
    setNewtask(task.text)
    setEdittask(task)
  }

  const complete =async(task) => {
    const radioref = doc(db,'ToDoList',task.id)
    await updateDoc(radioref,{completed:true})
  }






  return (
    <div className='maincontent'>
        <div className='leftcontent'>
          <img src= {dp} alt="" className='profpic' />
          <h1>Hi! {name}</h1>
          <img src={notes2} alt="" className='taskimg'/>

        </div>
        <div className='rightcontent'>
            <h1>My Task</h1>
              
            <div className='inputcontent'>

                <input type="text" placeholder='Enter the task here'  value={Newtask} onChange={Inputchange}/>
                <button onClick={Onsubmit}>Add</button>
            </div>
            <div className='tasklist'>
                <ul>
                   {

                    Tasks.map(task => 
                    <li>
                    <div className='taskcontent'>
                        <input type="radio" name="" id=""  onClick={() => complete(task)} checked = {task.completed}/>
                        <span className={`${task.completed?'completed':'notcompleted'}`}>{task.text}</span>
                        <button className='updatebutton' onClick={() => updatetask(task)}>UPD
                         
                        </button>
                        <button className='deletebutton' onClick={() => deletetask(task)}>
                          <img src={deletebutton} alt=""  className='delt'/>
                        
                        </button>

                    </div>
                    </li>
                    )}
                </ul>
             </div>
        </div>
    </div>
  )
}

export default Content
