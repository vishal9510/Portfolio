disp();
// category dropdown

let catdata = JSON.parse(localStorage.getItem("c-data"));
let row = "";
if (catdata != null && catdata.category.length > 0) {
  for (let i = 0; i < catdata.category.length; i++) {
    row +=
      "<option value =" +
      catdata.category[i].id +
      ">" +
      catdata.category[i].name +
      "</option>";
  }
  document.getElementById("catid").innerHTML = row;
}

// insert img in to change event

document.getElementById("pimg").addEventListener("change", function () {
  let photo = document.getElementById("pimg");
  if (photo.files && photo.files[0]) {
    let p = new FileReader();
    p.readAsDataURL(photo.files[0]);
    p.addEventListener("load", () => {
      localStorage.setItem("pimg", JSON.stringify(p.result));
      document.iform.imgupdate.value = p.result;
    });
  }
});

// insert data

document.getElementById("save-btn2").addEventListener("click", () => {
  let pcatid = document.iform.catid.value;
  let pname1 = document.iform.pname.value;
  let pprice = document.iform.price.value;
  let pimage = document.iform.imgupdate.value;
  let pid = document.iform.uid.value;
  let get = JSON.parse(localStorage.getItem("product"));

  let pstr = {
    id: 1,
    pid: 1,
    qty: 1,
    name: pname1,
    price: pprice,
    catid: pcatid,
    image: JSON.parse(localStorage.getItem("pimg")),
  };

  let pdetails = {};
  pdetails.productDetail = [pstr];

  if (pname1 != "") {
    if (get != null) {
      if (pid != "") {
        for (let i = 0; i < get.productDetail.length; i++) {
          if (pid == get.productDetail[i].id) {
            get.productDetail[i].name = pname1;
            get.productDetail[i].price = pprice;
            get.productDetail[i].catid = pcatid;
            if (pimage != "") {
              get.productDetail[i].image = pimage;
            } else {
              get.productDetail[i].image = JSON.parse(localStorage.getItem("pimg"));
            }
          }
        }
        localStorage.setItem("product", JSON.stringify(get));
        document.getElementById("uid").value = "";
        localStorage.removeItem("pimg");
      } else {
        let liti = get.productDetail.length;
        let pstr = {
          id: liti + 1,
          pid: liti + 1,
          qty: 1,
          name: pname1,
          price: pprice,
          catid: pcatid,
          image: JSON.parse(localStorage.getItem("pimg")),
        };
        get.productDetail.push(pstr);
        pdetails = get;
        localStorage.setItem("product", JSON.stringify(pdetails));
        localStorage.removeItem("pimg");
      }
    } else {
      pdetails.productDetail = [pstr];
      localStorage.setItem("product", JSON.stringify(pdetails));
      localStorage.removeItem("pimg");
    }

    document.iform.reset();
    disp();
  }
});

// dispaly data

function disp() {
  let tr = " ";
  tr += "<tr>";
  tr += "<th> ID </th>";
  tr += "<th> Category Name</th>";
  tr += "<th> NAME </th>";
  tr += "<th> Price </th>";
  tr += "<th> Image</th>";
  tr += "<th> ACTION</th>";

  let data = JSON.parse(localStorage.getItem("product"));
  if (data != null && data.productDetail.length > 0) {

    let cdata = JSON.parse(localStorage.getItem("c-data"));

    for (let i = 0; i < data.productDetail.length; i++) {
      tr += "<tr>";
      tr += "<td>" + data.productDetail[i].id + "</td>";

      for (let j = 0; j < cdata.category.length; j++) {

        if (cdata.category[j].id == data.productDetail[i].catid) {

          tr += "<td>" + cdata.category[j].name + "</td>";

        }

      }


      tr += "<td>" + data.productDetail[i].name + "</td>";
      tr += "<td>" + data.productDetail[i].price + "</td>";
      tr +=
        "<td><img src='" +
        data.productDetail[i].image +
        "'height='100px' width='100px'></td>";
      tr +=
        "<td><button type='button' name='ddata' id='ddata' onclick='daldata(" +
        data.productDetail[i].id +
        ")'>DELETE</button>";

      tr +=
        "<button type='button' name='udata' id='udata' onclick='Updata(" +
        data.productDetail[i].id +
        ")'>EDIT</button></td>";
    }
  }
  document.getElementById("tabid").innerHTML = tr;
}

// delete data

function daldata(id) {
  let data = JSON.parse(localStorage.getItem("product"));
  if (data != null && data.productDetail.length > 0) {
    let p = id - 1;
    data.productDetail.splice(p, 1);
    let j = 1;
    for (let i = 0; i < data.productDetail.length; i++) {
      data.productDetail[i].id = j;
      data.productDetail[i].pid = j;
      j++;
    }
    localStorage.setItem("product", JSON.stringify(data));
    disp();
  }
  disp();
}

// Updata data

function Updata(id) {
  let data = JSON.parse(localStorage.getItem("product"));
  for (let i = 0; i < data.productDetail.length; i++) {
    if (id == data.productDetail[i].id) {
      document.iform.pname.value = data.productDetail[i].name;
      document.iform.price.value = data.productDetail[i].price;
      document.iform.catid.value = data.productDetail[i].catid;
      document.iform.imgupdate.value = data.productDetail[i].image;
      document.iform.uid.value = data.productDetail[i].id;
    }
  }
}
