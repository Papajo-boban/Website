const api_url = "https://wt.ops.labs.vu.nl/api23/b187d90e/";

table = document.querySelector("table");
tbody = document.querySelector("tbody");

async function initialize() {
  let response = await fetch(api_url);
  data = await response.json();
  tbody.textContent = "";
  authorList = [];

  // Adds a row to the table body for each author in the database
  for (let entry of data) {
    var author = entry.author;
    if (authorList.indexOf(author) == -1) {
      authorList.push(author);
    }
    var id = entry.id;
    var alt = entry.alt;
    var tag = entry.tags;
    var image = entry.image;
    var description = entry.description;
    addRow(author, alt, tag, image, description, id);
  }

  // The list of unique author names is inserted above the table
  let al = document.getElementById("authorlist");
  al.textContent = "";
  for (let author of authorList) {
    let newAuthor = document.createElement("li");
    let textNode = document.createTextNode(author);
    newAuthor.appendChild(textNode);
    al.appendChild(newAuthor);

    // Adding the name-click filter
    newAuthor.addEventListener("click", (nameElement) => {
      hideRows(nameElement);
    });
  }
}

let add_form = document.querySelectorAll("form")[0];
let update_form = document.querySelectorAll("form")[1];

add_form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

async function add() {
  formData = new FormData(add_form)
  var response = await fetch(api_url, {
    method: "post",
    body: new URLSearchParams(formData),
  });

  if (response.ok) {
    alert("Author added successfully!");
    add_form.reset();
  } else { alert("ERROR: " + response.status); }
  initialize();
}

update_form.addEventListener("submit", function (event) {
  event.preventDefault();
  updateDB();
});

async function updateDB() {
  formData = new FormData(update_form)
  FDobject = Object.fromEntries(formData);
  updateID = formData.get("id");
  var response = await fetch(api_url + "item/" + updateID, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(FDobject)
  });
  if (response.ok) { alert("Update successful!"); update_form.reset(); } else { alert("Error: " + response.status); }

  initialize();
}

function addRow(author, alt, tag, image, description, id) {
  newRow = document.createElement("tr");

  // Adding an alternate method of filtering names by clicking the cell
  newAuthor = document.createElement("td");
  newAuthor.addEventListener("click", (nameElement) => {
    hideRows(nameElement);
  });
  newAuthor.addEventListener("mouseover", function () {
    this.style.background = "black";
    this.style.transform = "scale(1.1)";
  });
  newAuthor.addEventListener("mouseout", function () {
    this.style.background = "transparent";
    this.style.transform = "none";
  });

  link = document.createElement("div");
  link.setAttribute("class", "name");
  _Author = document.createTextNode(author);
  link.appendChild(_Author);
  newAuthor.appendChild(link);
  newRow.appendChild(newAuthor);

  newImage = document.createElement("td");
  _Image = document.createElement("img");
  _Image.src = image;
  newImage.appendChild(_Image);
  newRow.appendChild(newImage);

  newAlt = document.createElement("td");
  _Alt = document.createTextNode(alt);
  newAlt.appendChild(_Alt);
  newRow.appendChild(newAlt);

  newDesc = document.createElement("td");
  _Desc = document.createTextNode(description);
  newDesc.appendChild(_Desc);
  newRow.appendChild(newDesc);

  newTags = document.createElement("td");
  processed_tag = tag.replaceAll(",", ",<wbr>")
  _Tags = document.createTextNode(tag);
  newTags.appendChild(_Tags);
  newTags.innerHTML = processed_tag;
  newRow.appendChild(newTags);

  newID = document.createElement("td");
  _ID = document.createTextNode(id);
  newID.appendChild(_ID);
  newRow.appendChild(newID);

  tbody.appendChild(newRow);
}

// MODAL CREDIT: https://micromodal.vercel.app/
document.addEventListener("DOMContentLoaded", function () {
  try {
    MicroModal.init({
      awaitCloseAnimation: true,
      onShow: function (modal, activeElement, event) {
        microModalShow(modal, activeElement, event);
      },
      onClose: function (modal) {
      },
    });
  } catch (e) {
    console.log("micromodal error: ", e);
  }
});

// Resets and reloads the database
document.querySelector("#reset").addEventListener("click", resetDB);
async function resetDB() {
  let response = await fetch(api_url + "reset");
  initialize();
}

currentlyFiltered = ""

function hideRows(nameElement) {
  clickedName = nameElement.target.childNodes[0].textContent;
  let al = document.querySelectorAll("#authorlist li");
  for (let i = 0; i < al.length; i++) {
    let current = al[i];
    if (current.textContent == clickedName && currentlyFiltered != clickedName) {
      current.classList.add("selected");
    }
    else {
      current.classList.remove("selected");
    }
  }

  if (currentlyFiltered == clickedName) {
    unfilter()
    currentlyFiltered = ""
  }
  else {
    currentlyFiltered = clickedName
    names = document.getElementsByClassName("name");
    for (let i = 0; i < names.length; i++) {
      if (names[i].innerHTML != clickedName) {
        names[i].parentNode.parentNode.classList.add("filterHidden");
      }
      else {
        names[i].parentNode.parentNode.classList.remove("filterHidden");
      }
    }
  }
}

// The (probably unnecessary) Reset Filter button
document.querySelector("#unfilter").addEventListener("click", function () {
  unfilter();
  searchBox.value = "";
  search();
})

function unfilter() {
  names = document.getElementsByClassName("name");
  for (let i = 0; i < names.length; i++) {
    names[i].parentNode.parentNode.classList.remove("filterHidden");
  }
  search();
}

// Like the name-click filter, the search filter works by applying classes.
searchBox = document.querySelector('#search');
searchBox.addEventListener("keyup", search);
function search() {
  var td, i, j;
  var query = searchBox.value.toLowerCase();
  rows = table.querySelectorAll("tbody tr");
  for (i = 0; i < rows.length; i++) {
    td = rows[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j += 4) {
      if (td[j].innerHTML.toLowerCase().indexOf(query) > -1) {
        queryPresent = true;
      }
    }
    if (!queryPresent) {
      rows[i].classList.add("searchHidden");
    }
    else {
      rows[i].classList.remove("searchHidden");
    }
    queryPresent = false;
  }
}

// And we start!
initialize();
