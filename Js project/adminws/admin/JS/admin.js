disp();

// Insert-data

document.getElementById("addbtn").addEventListener("click", () => {
  let name = document.adminpanal.header.value;
  let hide = document.adminpanal.uid.value;
  let get = JSON.parse(localStorage.getItem("c-data"));
  let addheader = {};
  let str = {
    id: 1,
    name: name,
  };
  if (get != null) {
    if (hide != "") {
      for (let i = 0; i < get.category.length; i++) {
        if (hide == get.category[i].id) {
          get.category[i].name = name;
        }
      }
      localStorage.setItem("c-data", JSON.stringify(get));
      document.getElementById("uid").value = '';
    } else {
      let lan = get.category.length;
      str = {
        id: lan + 1,
        name: name,
      };
      get.category.push(str);
      addheader = get;
      localStorage.setItem("c-data", JSON.stringify(addheader));
    }
    
   
  } else {
    addheader.category = [str];
    localStorage.setItem("c-data", JSON.stringify(addheader));
  }
  document.adminpanal.reset();
  disp();
});

// Disple-data

function disp() {
  let tr = " ";
  let data = JSON.parse(localStorage.getItem("c-data"));
  if (data != null && data.category.length>0) {
  tr += "<tr>";
  tr += "<th> ID </th>";
  tr += "<th> NAME </th>";
  tr += "<th> ACTION </th>";
    for (let i = 0; i < data.category.length; i++) {
      tr += "<tr>";
      tr += "<td>" + data.category[i].id + "</td>";
      tr += "<td>" + data.category[i].name + "</td>";
      tr +=
        "<td><button type='button' name='ddata' id='ddata' onclick='daldata(" +
        data.category[i].id +
        ")'>DELETE</button>";

      tr +=
        "<button type='button' name='udata' id='udata' onclick='Updata(" +
        data.category[i].id +
        ")'>EDIT</button></td>";
    }
  }
  document.getElementById("tabid").innerHTML = tr;
}

// delete-data

function daldata(id) {
  let data = JSON.parse(localStorage.getItem("c-data"));
  if (data != null && data.category.length > 0) {
    let p = id - 1;
    data.category.splice(p, 1);
    let j = 1;
    for (let i = 0; i < data.category.length; i++) {
      data.category[i].id = j;
      j++;
    }
    localStorage.setItem("c-data", JSON.stringify(data));
  }
  disp();
}

// Updata-data

function Updata(id) {
  let data = JSON.parse(localStorage.getItem("c-data"));
  if (data != null) {
    for (let i = 0; i < data.category.length; i++) {
      if (id == data.category[i].id) {
        document.adminpanal.header.value = data.category[i].name;
        document.adminpanal.uid.value = data.category[i].id;
      }
    }
  }
}
