<template>
  <div  class=" flex items-center justify-center mt-10">
    <form action="/login"  @submit.prevent="login" method="post" >

  <div class="flex-container">
    <input id="username" type="text" placeholder="Enter Username" v-model="loginInfo.username" name="uname"  @blur="validate('username')" 
            @keypress="validate('username')" >
            <p 
                class="text-lg text-red-600 errors"  
                v-if="!!errors.username"
            >{{errors.username}}</p>
    <input  id="pwd" type="password" placeholder="Enter Password" v-model="loginInfo.password" name="psw"   @blur="validate('password')" 
            @keypress="validate('password')" >
            <p 
                class="errors font-large text-lg text-red-600" 
                v-if="errors.password"
            >{{errors.password}}</p>

    <button class="bg-blue-500" type="submit">Login</button>
   
  </div>
</form>
</div>
</template>


<script>
import  * as Yup from 'yup'
const loginFormSchema = Yup.object().shape({
  username: Yup.string().required("Username cannot be empty"),
  password: Yup.string().required("Password cannot be empty....")
});
export default {
  
  data() {
    return {
      loginUser:false,
      loginInfo: {
        username: '',
        password: ''
      },
      errors: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    async login() {
      loginFormSchema.validate(this.loginInfo,{ abortEarly: false }).then(async()=>{
        const response= await fetch('http://localhost:3000/credentials',{
        method:'get'
      })
      if(response.ok){
        let data =await response.json();
      const isUsernameMatch = this.loginInfo.username == data[0].username;
      const isPasswordMatch = this.loginInfo.password == data[0].password;

      console.log('Username match:', isUsernameMatch,this.loginInfo.username,data.username,data);
      console.log('Password match:', isPasswordMatch);
        
      if (isUsernameMatch && isPasswordMatch) {
       this.loginUser=true
       localStorage.setItem('user', this.loginUser)
       console.log(this.loginUser,'user')
        this.$router.push('/home');
        
        } else {
          console.log('Incorrect password or email ID');
      }
        }
      
      }).catch((err) => {
        console.log(err.inner,'error')
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        })
    },
    validate(field) {
      loginFormSchema.validateAt(field, this.loginInfo)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        }); 
    },

  }
}

</script>

<style scoped> 



input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  
}


button {
  
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}


button:hover {
  opacity: 0.8;
}
/* .flex-container {
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
 
} */

h1 {
  color:#04AA6D
}
/* .errors {
  color: red;
} */
</style>