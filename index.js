let that
let editFlag = false
let editID = ""
let li


// localStorage.setItem('orange', JSON.stringify(['item', 'item2']))
// const orange = JSON.parse(localStorage.getItem("orange"))
// console.log(orange);
// localStorage.removeItem('orange')



class Grocery{


  
 
 
 constructor(container){

  that = this
  this.main =  document.querySelector(container)
  this.input = this.main.querySelector('#groceries')
  this.form = this.main.querySelector('form')
  this.submit = this.main.querySelector('#submit') 
  this.groceryList = this.main.querySelector('.grocery-list')
  this.alert = this.main.querySelector('.alert')
  this.init()


 }
// get user input value
 init(){
  this.form.addEventListener('submit', this.addElm)
  window.addEventListener('DOMContentLoaded', this.setupItems)
  

 }


 


 displayAlert(text, action){ 
  this.alert.textContent = text
  this.alert.classList.add(`alert-${action}`)
  setTimeout(function(){
    that.alert.textContent=""
    that.alert.classList.remove(`alert-${action}`)

  }, 1000)
}

setBackDefault(){
  this.input.value = ""
  editFlag = false
  editID = ""
  this.submit.value="submit"

}

deleteItem(e){
  const el = e.currentTarget.parentElement.parentElement
  const id = el.getAttribute('index')
  that.groceryList.removeChild(el)
  that.displayAlert('item removed', 'fail')
  that.removeFromLocalStorage(id)
  that.setBackDefault()
 
  

}

editItem(e){
  li = e.currentTarget.parentElement.previousElementSibling
  editID = li.parentElement.getAttribute('index')
  that.input.value = li.textContent
  that.submit.value = 'edit'
  editFlag = true
  

}



 addElm(e){
   e.preventDefault()

   const id =new Date().getTime().toString()
   if(that.input.value && editFlag === false){
     that.createListItems(id, that.input.value)

     that.displayAlert('item added to the list', 'success')
     that.addToLocalStorage(id, that.input.value)
     that.setBackDefault()

   }else if(that.input.value && editFlag === true){
     li.innerHTML = that.input.value
     that.editFromLocalStorage(editID, that.input.value)
     that.displayAlert('edit item', 'success')
     that.setBackDefault()


   }
   else if(!that.input.value){
     that.displayAlert('empty value', 'fail')

   } 

 }

 createListItems(id, value){
  
     that.groceryList.insertAdjacentHTML('afterbegin', `<li index=${id}     
    class="list">
     <p class="title">${value}</p>
     <div class="btn-container">
      <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
      <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
     </div>
     </li>`)
     
     const deleteBtn = that.groceryList.querySelector('.delete-btn')
     const editBtn = that.groceryList.querySelector('.edit-btn')
     deleteBtn.addEventListener('click', that.deleteItem)
     editBtn.addEventListener('click', that.editItem)
}

 setupItems(){
   let items = that.getLocalStorage()  
   if(items.length > 0)  {
     items.forEach(function(item){
       that.createListItems(item.id, item.value)

     })
    
   }
    

 
}




 getLocalStorage(){
   return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []


 }


 addToLocalStorage(id, value){
  //  const grocery = {id: id, value:value}
  const grocery = {id, value}
  let items = this.getLocalStorage()
  items.push(grocery)
  localStorage.setItem('list', JSON.stringify(items))
 }

 editFromLocalStorage(id,value){
   let items = this.getLocalStorage()
   items = items.map(function(item){
     if(item.id === id){
       item.value = value
     }
     return item

   })
   localStorage.setItem('list', JSON.stringify(items))

 }

 



//  remove from local storage
removeFromLocalStorage(id){
  let items = this.getLocalStorage()
  items = items.filter(function(item){
    if(item.id !== id){
      return item
    }   

  })

  localStorage.setItem('list', JSON.stringify(items))
}

}


new Grocery('.container');






 

 






