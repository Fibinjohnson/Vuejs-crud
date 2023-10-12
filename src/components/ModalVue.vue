<template>
  <div>
   
  <Modal :size="size" v-if="status" @close="modalStatus">
    <template #header>  <div class="flex justify-end">
      <h1>Edit user Details</h1>
     </div></template>
    <template #body>
      <form class="w-full max-w-lg pl-16">
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      First Name
    </label>
    <input v-model="editedFname" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
  </div>
  <div class="w-full md:w-1/2 px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
      Last Name
    </label>
    <input v-model="editedLname" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" >
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
      Email
    </label>
    <input  v-model="editedEmail" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" >
   
  </div>
</div>

</form>
    </template>
   
    <template #footer>
      <div class="flex justify-center">
       
        <button @click="editUser" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Save
        </button>
      </div>
    </template>
  </Modal>
  </div>

</template>
<script setup>

// import { ref } from 'vue'
import { Modal } from 'flowbite-vue'
</script>
<script> 

export default {
  props: ['status','firstName','lastName','email','id'],
data() {
 return {
  isShowModal: '',
  editedFname:'',
  editedLname:'',
  editedEmail:''
 }
},
methods : {
modalStatus(){
      this.$emit('getStatus',this.isShowModal)
    },
editUser(){
  this.$emit('editedData',{fName:this.editedFname,
  lName:this.editedLname,
   Email:this.editedEmail,
  id:this.id})
  
}

},
updated(){
  this.editedFname=this.firstName,
  this.editedLname=this.lastName,
  this.editedEmail=this.email
}

}
</script>
