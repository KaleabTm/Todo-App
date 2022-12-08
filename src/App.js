import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTaskF from './components/Add'
import UpdateF from './components/UpdateForm'
import ToDo from './components/ToDo'

import './App.css'

function App() {

const [toDo,setToDo]= useState([
  // {"id":1,"title":"Task 1", "status":false},
  // {"id":1,"title":"Task 1", "status":false}
])

const [newTask,setNewTask]=useState('')

const [updateData,setUpdateData]=useState('')

const addTask = ()=>{
    if(newTask){
      let num=toDo.length+1
      let newEntry={id:num,title:newTask,status:false}
      setToDo([...toDo,newEntry])
      setNewTask('')
    }  

}

const deleteTask = (id)=>{
  let newTasks= toDo.filter(task=>task.id!==id)
  setToDo(newTasks)

  
}

const markDone = (id)=>{
  let newTask=toDo.map(task=>{
    if(task.id===id){
      return({...task,status:!task.status})
    }
    return task
  })
  setToDo(newTask)
}

const cancelUpdate = ()=>{
  setUpdateData('')
  
}


const changeTask = (e)=>{
  let newEntry={
    id:updateData.id,
    title:e.target.value,
    status:updateData.status?true : false
  }
setUpdateData(newEntry)
  
}

const updateTask = ()=>{
  let filterRecords = [...toDo].filter(task=>task.id !== updateData.id)
  let updatedObject= [...filterRecords,updateData] 
  setToDo(updatedObject)
  setUpdateData('')
}

  return (
    <div className="Container App">

      <br/><br/>
      <h2>ToDo App</h2>
      <br/><br/>

      {updateData && updateData?(
        <UpdateF updateTask={updateTask} changeTask={changeTask} updateData={updateData} cancelUpdate={cancelUpdate} />
      ):(
        <AddTaskF newTask={newTask} setNewTask={setNewTask} addTask={addTask}/>
      )}

      

{/* Add */}

      


    {toDo && toDo.length?'':'No Tasks...'}
    <ToDo toDo={toDo} markDone ={markDone } deleteTask={deleteTask } setUpdateData={setUpdateData}/>

    </div>
  );
}

export default App;
