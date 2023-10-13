
<template>
<div>
  <NavBar></NavBar>
  <div class="flex justify-center items-center ...">
  <form method="POST" @submit.prevent="addUser" class="w-full max-w-lg mt-10 mb-8" >
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input @blur="validate('FirstName')" :class="{'border border-red-500 ':errors.FirstName}" @keypress="validate('FirstName')" v-model="inputInfo.FirstName" class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
      <p 
                class="errors font-large text-sm text-red-600" 
                v-if="errors.FirstName"
            >{{errors.FirstName}}</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
     
       <input :class="{'border border-red-500 ':errors.LastName}"  @blur="validate('LastName')" @keypress="validate('LastName')" v-model="inputInfo.LastName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" >
       <p 
                class="errors font-large text-sm text-red-600" 
                v-if="errors.LastName"
            >{{errors.LastName}}</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
        Email
      </label>
      <input :class="{'border border-red-500 ':errors.Email}"  @blur="validate('Email')" @keypress="validate('Email')" v-model="inputInfo.Email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" >
      <p 
                class="errors font-large text-sm text-red-600" 
                v-if="errors.Email"
            >{{errors.Email}}</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <button  type="submit" class="py-2 px-4  bg-blue-700 rounded text-black-600 border border-blue-500 hover:border-black bg-white font-semibold">Add user</button>     
    </div>
  </div>
 
</form>
</div>
</div>
</template>


<script>
import NavBar from './NavBar.vue';
import * as Yup from 'yup'
const inputSchema=Yup.object().shape({
  FirstName:Yup.string().required('*required'),
  LastName:Yup.string().required('*required'),
  Email:Yup.string().email().required('*required')
})
export default {

  data() {
   return { 
    inputInfo:{  FirstName:'',
    LastName:'',
    Email:''}
  ,
  errors:{
    FirstName:'',
    LastName:'',
    Email:''
  },
    userDatas:''
   }
  },
  components:{NavBar },
  methods : {
 
   async addUser() {
    inputSchema.validate(this.inputInfo,{abortEarly:false}).then(async()=>{
      this.userDatas=JSON.parse(localStorage.getItem('userdata'))
    const users=this.userDatas;
    const lastId = Math.max(...users.map(user => user.id));
    let Nid=lastId+1
    if(Nid){
      await fetch('http://localhost:3000/users',{
       method :'POST',
       headers: {
        'Content-Type':'application/json'
       },
       body:JSON.stringify({
          id:Nid,
          first_name:this.inputInfo.FirstName,
          last_name:this.inputInfo.LastName,
          email:this.inputInfo.Email
       })
     })
    }
    this.$router.push('/home')
    }).catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        })
   },
   validate(field) {
      inputSchema.validateAt(field, this.inputInfo)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        }); 
    }
  }
}
</script>

<style>

</style>