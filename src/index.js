let addToy = false;
function createCardElement(toy){
  let card = document.createElement("div");
  card.classList.add("card");

  let h2 = document.createElement("h2");
  h2.textContent = toy.name;

  let img = document.createElement("img");
  img.src = toy.image;
  img.classList.add("toy-avatar");

  let p = document.createElement("p");
  p.textContent = `${toy.likes} Likes`;


  let btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.addEventListener("click", ()=>{
    p.textContent = `${toy.likes += 1} Likes`;
    updateLikes(toy.id, toy.likes)
  })
  btn.id = toy.id;
  btn.textContent = "Like ❤️";
  card.append(h2, img, p, btn);
  document.getElementById("toy-collection").appendChild(card)
}
function updateLikes(id, newNumberOfLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method:"PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })

}

function sendItOut(newToy){
  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      ...newToy,
     "likes": 0
    })

  }).then(res => res.json()).then(resToy => createCardElement(resToy))


}
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.forEach(toy=>createCardElement(toy)));

  const form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    sendItOut(formData);
    
  })
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



