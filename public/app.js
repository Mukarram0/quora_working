let bt=document.querySelector("button");
let post=document.querySelector("h3");

bt.addEventListener("click",()=>
{
    post.remove(this);
})