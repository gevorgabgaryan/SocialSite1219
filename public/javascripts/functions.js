const mainContainer=document.querySelector(`#mainContainer`)

function loginFunction(){
    mainContainer.innerHTML="",
    mainContainer.insertAdjacentHTML(`afterbegin`,`
    <form action="/auth/login" method="post" class="p-5 text-center">
     <h1>Login Form</h1>
    <div class="form-group">
      <label for="email">Email address:</label>
      <input type="email" class="form-control" placeholder="Enter email" name="email" id="email">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control"  placeholder="Enter password" name="password" id="pwd">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
   </form>
   <p class="p-5 text-center">
         <button class="btn btn-success" id="registerBtnLogin"> Register Now</button>
   </p>    
    `)  
    //go register
    let  registerBtnLogin=document.querySelector(`#registerBtnLogin`);
    registerBtnLogin.addEventListener(`click`,registerFunction);

    
}


function registerFunction(){
    mainContainer.innerHTML="",
    mainContainer.insertAdjacentHTML(`afterbegin`,`
    <form action="/auth/login" method="post" class="p-5 text-center" id="registerForm">
     <h1>Register Form</h1>
     <p id="registerError"></p>
     <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" class="form-control" placeholder="Enter username" name="username" id="username">
    </div>
    <div class="form-group">
      <label for="email">Email address:</label>
      <input type="email" class="form-control" placeholder="Enter email" name="email" id="email">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control"  placeholder="Enter password" name="password" id="pwd">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
   </form>
   <p class="p-5 text-center">
         <button class="btn btn-success" id="cancelRegister"> Cancel</button>
   </p>    
    `)  
    //go register
    let  cancelRegister=document.querySelector(`#cancelRegister`);
    cancelRegister.addEventListener(`click`,()=>{
        location.href="/"
    });

    //register user
    let registerForm=document.querySelector(`#registerForm`);
    let registerError=document.querySelector(`#registerError`)
    registerForm.addEventListener(`submit`,(e)=>{
        e.preventDefault();
        let registerInfo={
            username:registerForm.elements['username'].value,
            email:registerForm.elements['email'].value,
            password:registerForm.elements['password'].value,
        }

        fetch(`/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(registerInfo)
        }).then(res=>res.json())
        .then(data=>{
           console.log(data);
            let {error, info}=data;
            if(error){
                registerError.innerHTML=error;
                return;
            }

           if(info){
               loginFunction()
           }

        })
    })

    
}