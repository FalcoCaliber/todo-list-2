let submitButton = document.getElementById("submit");
let incompletedItems = [];
let completedItems = [];
let incompleteList = document.getElementById("incompleteList");
let completedList = document.getElementById("completedList");
let itemCounter = 1

// item constructor function
function Item(itemNumber, what, when, where)  {
  this.itemNumber = itemNumber,
  this.what = what,
  this.when = when,
  this.where = where
};

// submit Button Entry Pusher & Item Maker
submitButton.addEventListener('click', e => {
  e.preventDefault();
  pushEntryValues();
  makeListItem(incompletedItems[incompletedItems.length - 1], incompleteList) ;
  // console.log(submitButton.call(this));
});

// todo entry function
function pushEntryValues() {
  let what = document.forms.todoEntryForm.whatEntry.value ;
  let when = document.forms.todoEntryForm.whenEntry.value ;
  let where = document.forms.todoEntryForm.whereEntry.value ;
  itemCounter ++;
  let itemNumber = itemCounter;
  let newItem = new Item(itemNumber, what, when, where);
  incompletedItems.push(newItem);
  document.forms.todoEntryForm.reset();
} ;



// makes a list function
function makeListItem(item, whichList) {

  let listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listNumber = document.createElement('div');
  listNumber.id = item.itemNumber;
  $("div").data(listNumber.id, item);

  let listWhat = document.createElement('p')
  listWhat.innerText = item.what;
  let listWhen = document.createElement('p');
  listWhen.innerText = item.when;
  let listWhere = document.createElement('p');
  listWhere.innerText = item.where;
  let listDisplayText = document.createElement("div");
  listDisplayText.classList.add('list-display-text');


  let buttonsBox = document.createElement("div");
  buttonsBox.classList.add("btn-group", "list-buttons");

  let dlt = document.createElement("button");
  dlt.classList.add("btn", "btn-danger", "list-button");
  dlt.innerText = "Delete";
  dlt.addEventListener('click', e => {
    deleteItem(listItem);
  })

  let edit = document.createElement("button");
  edit.classList.add("btn", "list-button");
  edit.innerText = "Edit";
  edit.addEventListener('click', e => {
    editItem(listItem);
  })

  let complete = document.createElement("button");
  complete.classList.add("btn", "btn-success", "list-button");
  complete.innerText = "Complete";
  complete.addEventListener("click", completeItem);

  let redo = document.createElement('button');
  redo.classList.add("btn", 'list-button');
  redo.innerText = "Re-Do";
  redo.addEventListener('click', redoItem);

  (whichList === incompleteList) ? buttonsBox.appendChild(complete) : buttonsBox.appendChild(redo);
  buttonsBox.appendChild(dlt);
  (whichList === incompleteList) ? buttonsBox.appendChild(edit) : null ;

  listDisplayText.appendChild(listWhat);
  listDisplayText.appendChild(listWhen);
  listDisplayText.appendChild(listWhere);

  listItem.appendChild(listNumber);
  listItem.appendChild(listDisplayText);
  listItem.appendChild(buttonsBox);

  // let whichList = (item.parentNode === completedList) ? document.getElementById("completedList") : document.getElementById("incompleteList");

  whichList.insertBefore(listItem, whichList.childNodes[0]);



};

function completeItem() {
  let textParent = this.parentNode.parentNode;
  textTarget = $('div').data(textParent.childNodes[0].id);
  makeListItem(textTarget, completedList);
  deleteItem(textParent);
  completedItems.push($('div').data(textParent.childNodes[0].id));
  incompletedItems.splice($('div').data(textParent.childNodes[0].id))
  // completedItems.push(cItem);
  // makeListItem(completedItems.length-1);
  // deleteItem();
};

function deleteItem(listItem) {
   let parent = listItem.parentNode.parentNode.parentnode;
   let item = listItem.parentNode.parentNode;
   $(listItem).remove();

};

function editItem(listItem) {
  textTarget = $('div').data(listItem.childNodes[0].id);

  textTarget.what = prompt("what do you need to do?", "Re-think my life choices.")
  textTarget.when = prompt("When do you need to do it?", "After another this shot of cheap vodka.")
  textTarget.where = prompt("where do you need to do it?", "Over the porcelin goddess.")
  makeListItem(textTarget, (listItem.parentNode === incompleteList) ? incompleteList : completedList);
  deleteItem(listItem);
 console.log(listItem);
 console.log(incompletedItems);
 console.log(completedItems);
};

function redoItem() {
  let textParent = this.parentNode.parentNode;
  textTarget = $('div').data(textParent.childNodes[0].id);
  makeListItem(textTarget, incompleteList);
  deleteItem(textParent);
  completedItems.splice($('div').data(textParent.childNodes[0].id));
  incompletedItems.push($('div').data(textParent.childNodes[0].id));

};
