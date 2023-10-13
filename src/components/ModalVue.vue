<template>
  <div>
   
  <Modal :size="size" v-if="status" @close="modalStatus">
    <template #header>  <div class="flex justify-end">
      <h1>Edit user Details</h1>
     </div></template>
    <template #body>
      <form @submit.prevent="editUser"  class="w-full max-w-lg pl-16">
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      First Name
    </label>
    <input :class="{'border border-red-600':errors.editedFname}" @blur="validate('editedFname')" @keypress="validate('editedFname')" v-model="inputInfo.editedFname" class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
    <p 
                class="errors font-large text-sm text-red-600" 
                v-if="errors.editedFname"
            >{{errors.editedFname}}</p>
  </div>
  <div class="w-full md:w-1/2 px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
      Last Name
    </label>
    <input :class="{'border border-red-600':errors.editedLname}" @blur="validate('editedLname')" @keypress="validate('editedLname')" v-model="inputInfo.editedLname" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" >
    <p 
                class="errors font-large text-sm text-red-600" 
                v-if="errors.editedEmail"
            >{{errors.editedEmail}}</p>
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full px-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
      Email
    </label>
    <input :class="{'border border-red-600':errors.editedEmail}" @blur="validate('editedEmail')" @keypress="validate('editedEmail')" v-model="inputInfo.editedEmail" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" >
    <p 
                class="errors font-large text-sm text-red-600" 
                v-if="errors.editedEmail"
            >{{errors.editedEmail}}</p>
  </div>
</div>
<div class="flex justify-center">
       
       <button type="submit"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
       Save
       </button>
     </div>
</form>
    </template>

  </Modal>
  </div>

</template>
<script setup>
import { Modal } from 'flowbite-vue'
</script>

<script> 
import * as yup from 'yup'
 const inputSchema=yup.object().shape({
  editedFname:yup.string().required('*required'),
  editedLname:yup.string().required('*required'),
  editedEmail:yup.string().email().required('*required')
 })
export default {
  props: ['status','firstName','lastName','email','id'],
data() {
 return {
  isShowModal: '',
  inputInfo:{
    editedFname:'',
    editedLname:'',
    editedEmail:''
  },
  errors:{
    editedFname:'',
    editedLname:'',
    editedEmail:''
  }
 
 }
},
methods : {
modalStatus(){
      this.$emit('getStatus',this.isShowModal)
    },
editUser(){
  console.log('started')
  inputSchema.validate(this.inputInfo,{ abortEarly : false }).then(()=>{
    this.$emit('editedData',{fName:this.inputInfo.editedFname,
  lName:this.inputInfo.editedLname,
   Email:this.inputInfo.editedEmail,
  id:this.id})
  }).catch((err)=>{

    err.inner.forEach((error) => {
      
            this.errors = { ...this.errors, [error.path]: error.message };
          });
  })
},
validate(field) {
      inputSchema.validateAt(field, this.inputInfo)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          console.log(err,'....')
          this.errors[err.path] = err.message;
        }); 
    }

},
updated(){
  this.inputInfo.editedFname=this.firstName,
  this.inputInfo.editedLname=this.lastName,
  this.inputInfo.editedEmail=this.email
}

}
</script>
