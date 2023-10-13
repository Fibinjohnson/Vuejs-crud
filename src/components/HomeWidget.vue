/* eslint-disable */ 
<template>
    <div>
      
      <NavBar />
      <ModalVue @getStatus="status" @editedData="editedData" :status="showEdit" :id="editedId" :firstName="editedNamePh" :lastName="editedLnameph" :email="editedEmailph"/>
      <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">sl</th>
              <th scope="col" class="px-6 py-4">First</th>
              <th scope="col" class="px-6 py-4">Last</th>
              <th scope="col" class="px-6 py-4">Email</th>
              <th scope="col" class="px-6 py-4">Edit</th>
              <th scope="col" class="px-6 py-4">Delete </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-neutral-500" v-for="user in this.usersData" :key="user.id">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{{ user.id + 1 }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{user.first_name}}</td>
              <td class="whitespace-nowrap px-6 py-4">{{user.last_name}}</td>
              <td class="whitespace-nowrap px-6 py-4">{{user.email}}</td>
              <td class="whitespace-nowrap px-6 py-4"><Button class="bg-green-500  hover:bg-green-700 py-2 px-4 font-bold text-white  rounded" @click="editUsers(user.id)">Edit</Button></td>
              <td class="whitespace-nowrap px-6 py-4"><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteUsers(user.id)">Delete</button></td>
            </tr>
        
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  
</template>

<script>
import AppWidget from "./AddWidget.vue"
import ModalVue from './ModalVue.vue'
import NavBar from './NavBar.vue';
export default {
 props : ['isShowModal'],

data(){
    return {
      usersData:'',
      showAddComp:false,
      showEdit:false,
      showModal:false,
      editedNamePh:null,
      editedLnameph:null,
      editedEmailph:null,
      editedId:null,
      isEdited:'false',
    
    }
}  ,  
components:{NavBar ,ModalVue,AppWidget },
methods : {
    async getUsers(){
       const response=await fetch('http://localhost:3000/users',{
        method:'get'
       })
       let users=await response.json()
       this.usersData=users
       
      if(response.ok){
        localStorage.setItem('userdata',JSON.stringify(users) )
       
      }
    },
    async deleteUsers(id){
       const res= await fetch(`http://localhost:3000/users/${id}`,{
            method:'delete'
        })
      console.log(this.usersData)
       this.usersData=this.usersData.filter((user)=>{return user.id!==id})

    },
    async editUsers(id){
        // const responseData=await fetch(`http://localhost:3000/users/${id}`,{
        //     method:"GET",
        // })
        const updatedUser1=this.usersData.filter((user)=>{return user.id===id})
        console.log(updatedUser1[0],'edited')
        this.editedNamePh=updatedUser1[0].first_name
        this.editedLnameph=updatedUser1[0].last_name
        this.editedEmailph=updatedUser1[0].email,
        this.editedId=updatedUser1[0].id
        this.showEdit=!this.showEdit
     
    },
    status(data){
      this.showEdit=data;
    },
   async editedData(data  ){
      this.editedNamePh=data.fName
      this.editedLnameph=data.lName
      this.editedEmailph=data.Email
      {  
           await fetch(`http://localhost:3000/users/${data.id}`,{
            method:"PATCH",
            headers: {
               'Content-Type':'application/json'
             },
             body: JSON.stringify({
              id:data.id,
              first_name:this.editedNamePh,
              last_name:this.editedLnameph,
              email:this.editedEmailph
             })
        })
        this.showEdit=false
        this.usersData=await this.usersData.map((user)=>{ if(user.id===data.id){
          return {...user,id:user.id,first_name:this.editedNamePh, last_name:this.editedLnameph,
              email:this.editedEmailph}
              
        }
        return user})
        
        }
    }
  
    
   
},
mounted () {
    this.getUsers()
},
// updated () {
//   if(this.shouldFetchData){
//     this.getUsers()
//     this.shouldFetchData = false
//   }
    
// }
}
</script>


<style>

</style>