<template>
    <form action="/login"  @submit.prevent="login" method="post">

  <div class="flex-container">
    <input id="username" type="text" placeholder="Enter Username" name="uname" required>
    <input  id="pwd" type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit">Login</button>
   
  </div>
</form>

</template>


<script>
export default {
  methods: {
    login() {
      let username = document.getElementById('username').value;
      let password=document.getElementById('pwd').value;

      console.log(username,password, 'username');
    }
  }
}

</script>

<style scoped> 

form {
  width:50%;
  margin-right: 450px;
  margin-left: 400px;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  
}


button {
  background-color: #04AA6D;
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
.flex-container {
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
 
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1 {
  color:#04AA6D
}
</style>