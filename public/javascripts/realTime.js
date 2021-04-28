let url="http://localhost:3000/"
const socket=io(url,{
    autoConnect:false,
})

function newUser(){
    let authToken=localStorage.getItem(`authToken`)
    socket.auth={
        authToken
    }
    socket.connect()
}


socket.on(`new online user`,data=>{
    let {username,id}=data;
    addonlineUser(username,id)
})

socket.on(`online users`,data=>{
    console.log("online users",data);
    data.forEach(user=>{
        let {username,id}=JSON.parse(user);
        addonlineUser(username,id)

    })
})


function addonlineUser(username,id){
    let onlinesSection=document.querySelector(`#onlinesSection`);
    //checking if is online already user
    if(onlinesSection.querySelector(`#o${id}`)){
        return
    }
    onlinesSection.insertAdjacentHTML(`afterbegin`,`
      <h1 id="o${id}">${username}</h1>
    `)
}