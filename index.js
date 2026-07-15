const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const{ v4: uuidv4}=require('uuid');
const methodoverride=require("method-override");
app.use(methodoverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts=[
    {
    id:uuidv4(),
    username:"Mukarram",
    content:"I like coding.",
},
{    id:uuidv4(), 
    username:"Qausain",
    content:"Gym is important for success.",
},
{   id:uuidv4(),
    username:"Afroz",
    content:"Paise nhi hain hain bhai",
}
]
app.listen(port,()=>
{
console.log(`server ${port} is online...`);
});

app.get("/posts",(req,res)=>
{
  res.render("index.ejs",{posts}); 
});
app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>
{
    let id=uuidv4();
    let{username,content}=req.body;
    let newp={
        id,
        username,
        content
    }
    posts.push(newp);
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    let post=posts.find((p)=> p.id===id);
    res.render("show.ejs",{post});
    
})
app.patch("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    let newc=req.body.content;
    let post=posts.find((p)=> p.id===id);
    post.content=newc;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>
{
    let {id}=req.params;
    let post=posts.find((p)=> p.id===id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>
{
    let{id}=req.params;
    posts=posts.filter((p)=> p.id!==id);
    res.redirect("/posts");
    
})
