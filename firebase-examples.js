import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, update, remove, onValue, get, child, onChildRemoved, onChildAdded } from "firebase/database";

const firebaseConfig = {
  // Your Firebase Config
};

//Database initialization
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

//-----Set: save data to a specified reference.

//Add string data to root node.
set(ref(database), "Cat");

//Add object data to root node.
set(ref(database), {
  title: "Blog",
  description: "Blog description",
  author: {
    name: "Tim",
    surname: "Cat",
  }
});

//Add array data to specific node.
set(ref(database, "pets"), ["Cat", "Dog", "fish"]);

//Promise for status control.
set(ref(database), "Duck").then(() => {
    //Works when there is no error.
    console.log("Successfully added.");
}).catch((e) => {
    //Works when there is an error.
    console.log("Error: ", e);
});

//Changeing spesific node item value.
set(ref(database, "blogs/blog1"), {
    title: "Blog",
    description: "Blog description",
});

set(ref(database, "blogs/blog1/title"), "Blog 2");

set(ref(database, "blogs/blog1/title"), {
    name: "Blog 3",
    color: "Red"
});



//-----push: Every time you push a new node onto a list.

// Pushing string data to root node.
push(ref(database), "Dog");

// Pushing object data to exist node.
push(ref(database,"blogs"), {
    title: "Blog 4",
    description: "Blog description 2",
});



//-----update: Add to a list of data in the database. Every time you push a new node onto a list.
update(ref(database), {
   "blogs/blog1/title/color" : "Blue"
});

update(ref(database, "blogs/blog1/title/color"), {
    color: "Orange"
});



//-----Remove

//Removing all records.
remove(ref(database));

//Removing spesific node records.
remove(ref(database, "blogs/blog1/title"));

//Alternative method
set(ref(database), null);
set(ref(database, "blogs/blog1"), null);



//Data Retrieving 
//----- onValue: New records comes automatically when records changes.

//Retrieving all records
onValue(ref(database), (snapshot) =>{
    console.log("All records: ", snapshot.val());
});

//Retrieving specific node records
onValue(ref(database, "blogs"), (snapshot) =>{
    console.log("Blog records: ", snapshot.val());
});


//----- get: Works one time. New records do not come automatically when records changes.
//child: Gets a Reference for the location at the specified relative path.
get(child(ref(database), "blogs")).then((snapshot) => {
    if (snapshot.exists()){
        console.log("Blogs records - once: ",snapshot.val());
    }else{
        console.log("No data available.");
    }
}).catch((e) => {
    console.log("Error: ", e);
});



//Toggle methods
//onChildAdded: Will be triggered once for each initial child at this location, and it will be triggered again every time a new child is added.
onChildAdded(ref(database, "blogs"), ()=>{
    console.log("Blog added.");
});


//onChildRemoved: Will be triggered once every time a child is removed.
onChildRemoved(ref(database, "blogs"), ()=>{
    console.log("Blog removed.");
});