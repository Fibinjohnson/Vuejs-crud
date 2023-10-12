
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
      <input v-model="FirstName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input v-model="LastName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" >
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
        Email
      </label>
      <input v-model="Email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" >
     
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
export default {
  data() {
   return {
    FirstName:'',
    LastName:'',
    Email:'',
   }
  },
  components:{NavBar },
  methods : {
   async addUser() {
    const res=await fetch('http://localhost:3000/users',{
      method:'GET'
    })
    const users=await res.json();
    console.log(users,'users')
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
          first_name:this.FirstName,
          last_name:this.LastName,
          email:this.Email
       })
     })
    }
    this.$router.push('/home')
  
   }
  }


}
</script>

<style>

</style>