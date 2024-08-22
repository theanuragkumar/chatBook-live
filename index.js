let sendBtn = document.querySelector("#sendBtn");
let msgInput = document.querySelector("#typeMsg");
let msgContent = document.querySelector(".msg_content");
let bodyTag = document.querySelector("body");
let callTools = document.querySelectorAll(".call");
let OuterVideo = document.querySelector(".OutervideoBar");
let InnerVideo = document.querySelector(".NestedvideoBar");
let VisualsBox = document.querySelector("#visualsBox");
// let msgPrivate = document.querySelector(".msg_private");
let ApearLSbar = document.querySelector(".apearL");
let ApearRSbar = document.querySelector(".apearR");
let s_barDivL = document.querySelector("#s_barL");
let s_barDivR = document.querySelector("#s_barR");
let s_barUListR = document.querySelector("#s_listR");
let s_barUListL = document.querySelector("#s_barL");
let activeBox = document.querySelector("p");
let switchmode = document.querySelector("#toggle");
let fullscreenBtn = document.querySelector("#fullScreen");
let togglePos = document.querySelector("#TDesign");
let headBar = document.querySelector("header");
let headtext = document.querySelector("#headText");
let headIcon = document.querySelector(".headIcon");
let listofUserR = [],
  iconofUserR = [],
  listBtnR = [],
  listnameR = [];
let listofUserL = [],
  iconofUserL = [],
  listBtnL = [],
  listnameL = [];
let msgPrivate = [],
  room = {},
  buttonListner = [],display;
let userNameBox = document.querySelector("#s_listR");
let s_Icon = document.querySelector(".material-symbols-outlined");
let mode = "dark",
  i = 0,
  iVcheck = 0,
  noLeftmgs = 0,
  nochatWindow = 0; // i value check
let data,
  msgCount,
  windowFlag = true; //windowFlag is used to check the group chat user chat window is already present or not.
var index = 0,
  className;
  const alphabeticPattern= /^[A-Za-z]+$/;
// const socket = io("http://localhost:8000");
const socket=io('https://chatbook-server-3hmu.onrender.com');
let name = prompt("Enter your name");
if (name == "" || name == null ) {
  do {
    alert("Name is compulsory!");
    name = prompt("Enter your name");
  } while (name == "" || name == null);
}
if(!alphabeticPattern.test(name))
{
  do {
    alert("Name Should conatin only Alphabets no  Whitespaces are allowed !");
    name = prompt("Enter your name");
  } while (!alphabeticPattern.test(name))

}

// hiding the calltools
Array.from(callTools).forEach((eachtool) => {
  eachtool.style.display = "none";
});

// full screen btn adding event listener
fullscreenBtn.addEventListener("pointerdown", () => {

  if(display !='fullScreen')
  {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullscreen) {
    document.documentElement.mozRequestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
  display='fullScreen';
}
else{
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullscreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  display='smallScreen'
}
});

function handleBtnclick(event) {
  // the commented below logic fails when a user is left and again eneter the  grp chat the sequence of rlistbtn is changed and the


  // using robust logic below comparing the class of privateMsg whit the class od e.traget.and then finding the associated privateMsg window
  //then openning or closing of window is being decided

  //checking the each left button class list and comparing with e.target classlist.
  for (index = 0; index < nochatWindow; index++) {
    if (msgPrivate[index].classList[2] === event.target.classList[1]) {
      //when  opneing the private chat from the group chat

      if (
        msgPrivate[index].style.left != "auto" &&
        msgContent.style.display != "none"
      ) {
        msgContent.style.display = "none";
        Array.from(callTools).forEach((eachtool) => {
          eachtool.style.display = "inline-block";
        });
        msgPrivate[index].style.display = "flex";
        msgPrivate[index].scrollTop =msgPrivate[index].scrollHeight;
        msgPrivate[index].style.left = "auto";
        if (name == msgPrivate[index].classList[2]) {
          headtext.innerHTML = msgPrivate[index].classList[2] + " (me)";
        } else {
          headtext.innerHTML = msgPrivate[index].classList[2];
        }
      }

      // opening the group chat when clicked twice on the same name;
      else if (
        headtext.innerHTML == msgPrivate[index].classList[2] + " (me)" ||
        headtext.innerHTML == msgPrivate[index].classList[2]
      ) {
        msgContent.style.display = "flex";
        msgContent.scrollTop =msgContent.scrollHeight;

        Array.from(callTools).forEach((eachtool) => {
          eachtool.style.display = "none";
        });
        msgPrivate[index].style.display = "none";
        msgPrivate[index].style.left = "-100vw";
        headtext.innerHTML = "Welcome To ChatBook !";
      }
      // opening the another private chat from other private chat
      else {
        msgContent.style.display = "none";
        Array.from(callTools).forEach((eachtool) => {
          eachtool.style.display = "inline-block";
        });
        msgPrivate.forEach((chatWindow, Lno) => {
          if ((headtext.innerHTML == chatWindow.classList[2]) ||(headtext.innerHTML == chatWindow.classList[2]+' (me)'  )) {
           
            msgPrivate[Lno].style.display = "none";
           
          }
          console.log('try');
        });

        // display none to the  msg window jisse dusre pe click kiya gya hai.
        msgPrivate[index].style.display = "flex";
        msgPrivate[index].scrollTop =msgPrivate[index].scrollHeight;

        msgPrivate[index].style.left = "auto";
        // here in line 169 i have faced problem that the index of the chatwindow do not matches with the position/indx of the right button
        // there fore could not read the mismatch rbtn innerHTML sice that undex btn never exist  chat window= 4 and btn =2;index =3 whhich is
        //not available
        listnameR.forEach((listname, Lno) => {
          if (msgPrivate[index].classList[2] == listname.classList[1]) {
            headtext.innerHTML = listnameR[Lno].innerHTML;
          }
        });
        //  headtext.innerHTML = listnameR[index].innerHTML;
      }

      break;
    }
  }
  // to maintain index< nochatWindow then only msgprivate[index] wii be valid
}

function handleLeftBtnclick(event) {
  //checking the each left button class list and comparing with e.target classlist.
  for (index = 0; index < nochatWindow; index++) {
    if (msgPrivate[index].classList[2] === event.target.classList[1]) {
      //when  opneing the private chat from the group chat
      if (
        msgPrivate[index].style.left != "auto" &&
        msgContent.style.display != "none"
      ) {
        msgContent.style.display = "none";
        // not  allowing the calltools to visible whwn grp chat is open
        Array.from(callTools).forEach((eachtool) => {
          eachtool.style.display = "inline-block";
        });
        msgPrivate[index].style.display = "flex";
        msgPrivate[index].style.left = "auto";
        msgPrivate[index].scrollTop =msgPrivate[index].scrollHeight;
        if (name == msgPrivate[index].classList[2]) {
          headtext.innerHTML = msgPrivate[index].classList[2] + " (me)";
        } else {
          headtext.innerHTML = msgPrivate[index].classList[2];
        }
      }

      // opening the group chat when clicked twice on the same name;
      else if (
        headtext.innerHTML == msgPrivate[index].classList[2] + " (me)" ||
        headtext.innerHTML == msgPrivate[index].classList[2]
      ) {
        msgContent.style.display = "flex";
        msgContent.scrollTop =msgContent.scrollHeight;

        // not  allowing the calltools to visible whwn grp chat is open
        msgPrivate[index].style.display = "none";
        Array.from(callTools).forEach((eachtool) => {
          eachtool.style.display = "none";
        });
        msgPrivate[index].style.left = "-100vw";
        headtext.innerHTML = "Welcome To ChatBook !";
      }
      // opening the another private chat from other private chat
      else {
        msgContent.style.display = "none";

        // not  allowing the calltools to visible whwn grp chat is open
        Array.from(callTools).forEach((eachtool) => {
          eachtool.style.display = "inline-block";
        });
        //asscessing the previous open chat window from both left and  right side bar
        msgPrivate.forEach((chatWindow, Lno) => {
          if ((headtext.innerHTML == chatWindow.classList[2]) ||(headtext.innerHTML == chatWindow.classList[2]+' (me)'  )) {
           
            msgPrivate[Lno].style.display = "none";
           
          }
          console.log('try');
        });
        // scenario when the click to other chat window is done from left side bar  button that button donot exist in the left button.

        // listnameL.forEach((listname, Lno) => {
        //   if ((headtext.innerHTML == listname.innerHTML) ||(headtext.innerHTML == listname.innerHTML+' (me)'  )) {
        //     msgPrivate[Lno].style.display = "none";
        //     console.log('catch');
        //   }
        //   console.log('try');
        // });

        // display none to the  msg window jisse dusre pe click kiya gya hai.
        msgPrivate[index].style.display = "flex";
        msgPrivate[index].style.left = "auto";
        msgPrivate[index].scrollTop =msgPrivate[index].scrollHeight;

        headtext.innerHTML = listnameL[index].innerHTML;
      }

      break;
    }
  }
  // to maintain index< nochatWindow then only msgprivate[index] wii be valid
}

// it also include saveContact emit emitter which saves the user personal contacts
function outMsg(window, data) {
  var divCreate = document.createElement("div");
  divCreate.innerHTML =
    "<h5>" + "~ me" + "</h5>" + data.value + "<h6>" + data.time + "</h6>";

  if (
    (msgPrivate.length == 0 || msgPrivate[index].style.left != "auto") &&
    window == "group"
  ) {
    // if( window =='group')
    msgContent.appendChild(divCreate);

    msgContent.scrollTop = msgContent.scrollHeight;
  }
  // this case is when no private chats are display flex i.e not open and putting data into each window from database
  else if (
    (msgPrivate.length == 0 || msgPrivate[index].style.left != "auto") &&
    window != "group"
  ) {
    //  else if(window !='group')
    msgPrivate.forEach((chatWindow) => {
      if (chatWindow.classList.contains(window) == true) {
        chatWindow.appendChild(divCreate);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    });
  }

  // important step in else part only
  else {
    msgPrivate[index].appendChild(divCreate);
    //Concatenating the class User name to the msgPrivate to link with the buttons to the left
    msgPrivate[index].classList.add(headtext.innerHTML.trim().split(/\s+/)[0]);

    msgPrivate[index].scrollTop = msgPrivate[index].scrollHeight;
    //emiting socket event to save the personal chattings in their named database
    // unke khud k naam k database me unke sabhi contacts k sath baat store karna hai

    // just creating the left list of permanent contacts.
    if (msgPrivate[index].childElementCount == 1) {
      listnameL.forEach((singleBtn) => {
        singleBtn.removeEventListener("pointerdown", handleLeftBtnclick);
      });

      listofUserL[noLeftmgs] = document.createElement("li");
      listofUserL[noLeftmgs].classList.add("pseudoClass");
      listofUserL[noLeftmgs].classList.add(
        headtext.innerHTML.trim().split(/\s+/)[0]
      );
      //created and appending the list.

      s_barUListL.appendChild(listofUserL[noLeftmgs]);

      //writing the button
      listBtnL[noLeftmgs] = document.createElement("button");
      listBtnL[noLeftmgs].classList.add("listBtn");
      listBtnL[noLeftmgs].classList.add(
        headtext.innerHTML.trim().split(/\s+/)[0]
      );

      listofUserL[noLeftmgs].appendChild(listBtnL[noLeftmgs]);

      // writing the user icon
      iconofUserL[noLeftmgs] = document.createElement("span");
      iconofUserL[noLeftmgs].classList.add("material-symbols-outlined");
      iconofUserL[noLeftmgs].classList.add(
        headtext.innerHTML.trim().split(/\s+/)[0]
      );
      iconofUserL[noLeftmgs].classList.add("iconPosition");
      listBtnL[noLeftmgs].appendChild(iconofUserL[noLeftmgs]);
      iconofUserL[noLeftmgs].innerHTML = "person";

      // writing the user name inside the button
      listnameL[noLeftmgs] = document.createElement("span");
      listnameL[noLeftmgs].classList.add("pseudoClass");
      listnameL[noLeftmgs].classList.add(
        headtext.innerHTML.trim().split(/\s+/)[0]
      );
      listBtnL[noLeftmgs].appendChild(listnameL[noLeftmgs]);
      if (headtext.innerHTML == name)
        listnameL[noLeftmgs].innerHTML = headtext.innerHTML + " (me)";
      else listnameL[noLeftmgs].innerHTML = headtext.innerHTML;
      //adding event listener for the buttons in the left side bar.
      //keep in mind when the number of buttons is increased then the previous event listener should be cancelled and new event listener
      // should be added.

      listBtnL.forEach((singleBtn) => {
        singleBtn.addEventListener("pointerdown", handleLeftBtnclick);
        // opening the privateMsg when clicked on once
        // index
      });

      //we are saving the contact in the  username specific personal collection only
      socket.emit("saveContact", name, {
        contactName: listnameL[noLeftmgs].innerHTML,
      });
      noLeftmgs++;
    }
  }

  divCreate.classList.add("right");

  // msgInput.focus();
  msgInput.setSelectionRange(0, 0);
  msgInput.value = "";
  msgInput.style.height = "40px";
}

function notifyMsg(data, action) {
  var divCreate = document.createElement("div");
  var ctime = new Date();
  if ((data.value == "joined" || data.value == "left") && data.name == name) {
    divCreate.innerHTML = "me " + data.value + "<h6>" + data.time + "</h6>";
  } else {
    divCreate.innerHTML =
      data.name + " " + data.value + "<h6>" + data.time + "</h6>";
  }

  msgContent.appendChild(divCreate);
  divCreate.classList.add("center");
  msgContent.scrollTop = msgContent.scrollHeight;

  if (action == "pink" || data.value == "left") {
    divCreate.style.backgroundColor = "rgb(217 125 140)";
  }
}

function inMsg(window, data) {
  var divCreate = document.createElement("div");
  // divCreate.innerHTML=data;

  if (window === "group") {
    divCreate.innerHTML =
      "<h5>" +
      "~ " +
      data.name +
      "</h5>" +
      data.value +
      "<h6>" +
      data.time +
      "</h6>";
    msgContent.appendChild(divCreate);
    msgContent.scrollTop = msgContent.scrollHeight;
  } else {
    msgPrivate.forEach((chatWindow) => {
      if (chatWindow.classList.contains(window) == true) {
        divCreate.innerHTML =
          "<h5>" +
          "~ " +
          window +
          "</h5>" +
          data.value +
          "<h6>" +
          data.time +
          "</h6>";
        chatWindow.appendChild(divCreate);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    });
  }
  divCreate.classList.add("left");
}

var ctime = new Date();
data = {
  name,
  value: "joined",
  time: ctime.toLocaleString(),
};

socket.emit("me-user-has-joined", data);
// added the msgPrivate and msgContent on pointerDown event listener to close the side bars

ApearLSbar.addEventListener("pointerdown", () => {
  if (s_barDivL.style.left == "0px") {
    s_barDivL.style.left = "-300px";
  } else {
    s_barDivL.style.left = "0px";
    msgContent.addEventListener("pointerdown", () => {
      s_barDivL.style.left = "-300px";
    });
    msgPrivate.forEach((chatWindow) => {
      chatWindow.addEventListener("pointerdown", () => {
        s_barDivL.style.left = "-300px";
      });
    });
  }
});

ApearRSbar.addEventListener("pointerdown", () => {
  if (s_barDivR.style.right == "0px") {
    s_barDivR.style.right = "-300px";
  } else {
    s_barDivR.style.right = "0px";
    msgContent.addEventListener("pointerdown", () => {
      s_barDivR.style.right = "-300px";
    });
    // console.log(index);
    msgPrivate.forEach((chatWindow) => {
      chatWindow.addEventListener("pointerdown", () => {
        s_barDivR.style.right = "-300px";
      });
    });
  }
});

msgContent.addEventListener("pointerdown", () => {
  headIcon.style.scale = "0.7";
  headIcon.style.left = "0";
  headIcon.style.top = "0";
});

socket.on("user-has-joined", (data) => {
  data.value = "joined";

  // activeBox.innerHTML="Active : " +data[1];
  notifyMsg(data, "green2");
  // console.log(data,"has joined");
});

// reading the mesasage  the user joined.
socket.on(name, (data) => {
  //data[1] is the getcontact from the database..... left user permenant chats.
  Array.from(data[1]).forEach((data) => {
    listofUserL[noLeftmgs] = document.createElement("li");
    //created and appending the list.
    listofUserL[noLeftmgs].classList.add("pseudoclass");
    listofUserL[noLeftmgs].classList.add(
      data.contactName.trim().split(/\s+/)[0]
    );
    s_barDivL.appendChild(listofUserL[noLeftmgs]);

    //writing the button
    listBtnL[noLeftmgs] = document.createElement("button");
    listBtnL[noLeftmgs].classList.add("listBtn");
    listBtnL[noLeftmgs].classList.add(data.contactName.trim().split(/\s+/)[0]);
    listofUserL[noLeftmgs].appendChild(listBtnL[noLeftmgs]);

    //adding only chat window whose name is not present  in the list of permenant side contact.

    // associating the chat window with each contact creating in the left side bar
    msgPrivate[nochatWindow] = document.createElement("div");
    msgPrivate[nochatWindow].classList.add("msg_private");
    msgPrivate[nochatWindow].classList.add("contdark");
    msgPrivate[nochatWindow].addEventListener("pointerdown", () => {
      headIcon.style.scale = "0.7";
      headIcon.style.left = "0";
      headIcon.style.top = "0";
    });
    msgPrivate[nochatWindow].classList.add(
      data.contactName.trim().split(/\s+/)[0]
    );
    bodyTag.appendChild(msgPrivate[nochatWindow]);

    nochatWindow++;

    // writing the user icon
    iconofUserL[noLeftmgs] = document.createElement("span");
    iconofUserL[noLeftmgs].classList.add("material-symbols-outlined");
    iconofUserL[noLeftmgs].classList.add(
      data.contactName.trim().split(/\s+/)[0]
    );
    iconofUserL[noLeftmgs].classList.add("iconPosition");
    listBtnL[noLeftmgs].appendChild(iconofUserL[noLeftmgs]);
    iconofUserL[noLeftmgs].innerHTML = "person";

    // writing the user name inside the button
    listnameL[noLeftmgs] = document.createElement("span");
    listnameL[noLeftmgs].classList.add("pseudoClass");
    listnameL[noLeftmgs].classList.add(data.contactName.trim().split(/\s+/)[0]);
    listBtnL[noLeftmgs].appendChild(listnameL[noLeftmgs]);
    if (data.contactName == name) {
      listnameL[noLeftmgs].innerHTML = data.contactName + " (me)";
    } else {
      listnameL[noLeftmgs].innerHTML = data.contactName;
      // creating a room for each left side bar permenant user

      // creating a room for each left side bar permenant user
      if (data.contactName != name + " (me)") {
        room[data.contactName] = [data.contactName, name].sort().join("-");
        socket.emit("join-room", room[data.contactName]);
        //here giving the room name as the front and user name in alphabetical sorted sequence separated by hyphen.
      }
    }
    noLeftmgs++;
  });

  listBtnL.forEach((singleBtn) => {
    singleBtn.addEventListener("pointerdown", handleLeftBtnclick);
  });

  // data is the array containg three DataTransferItemList.
  // data[2] is the object of information given by server.js

  //data[0] is the getdata from the database..... only for the group chat window.

  // data[2] is the personal message of the name user with its contacts.
  console.log(data[2]);
  Array.from(data[2]).forEach((eachdata) => {
    eachdata.forEach((specificData) => {
      // console.log(specificData,typeof(specificData),specificData.value,specificData.name);

      if (specificData.from == name) {
        // pssing the parameter eachdata.name to get to know in which chat window the data has to printed.
        outMsg(specificData.to, specificData);
      } else {
        inMsg(specificData.from, specificData);
      }
    });
  });

  Array.from(data[0]).forEach((eachdata) => {
    if (eachdata.value != "joined" && eachdata.value != "left") {
      if (eachdata.name == name) {
        outMsg("group", eachdata);
      } else {
        inMsg("group", eachdata);
      }
    } else {
      notifyMsg(eachdata);
    }
  });

  var ctime = new Date();

  notifyMsg(
    {
      name,
      value: "joined",
      time: ctime.toLocaleString(),
    },
    "greenme"
  );
});

// facing error here

// no and list of user is in right side bar
socket.on("noOfuser", (activUser) => {
  activeBox.innerHTML = "Active : " + activUser.no;

  if (activUser.no > 1) {
    ////removed event listener
    listnameR.forEach((singleBtn) => {
      singleBtn.removeEventListener("pointerdown", handleBtnclick);
    });
  }

  // niche wala code tab chalega jab aap hi woh user ho  jo abhi  akhir me join hua h uske phele k sab user right side load honge.
  if (
    s_barUListR.children.length == 0 ||
    s_barUListR.children.length > activUser.no
  ) {
    // jab loi user left karega toh active me update k sath sath right side bar me uska naam hata na hai.
    if (s_barUListR.children.length > activUser.no) {
      s_barUListR.innerHTML = "";
    }

    Array.from(activUser.content).forEach((userName, i) => {
      listofUserR[i] = document.createElement(activUser.type);
      listofUserR[i].classList.add("pseudoClass");
      listofUserR[i].classList.add(userName);

      // when user is connecting in the group chat then already existed users window creation.
      listnameL.forEach((leftname) => {
        if (leftname.innerHTML.trim().split(/\s+/)[0] === userName) {
          windowFlag = false;
        }
      });
      msgPrivate.forEach((chatWindow) => {
        if (chatWindow.classList[2] == userName) {
          windowFlag = false;
        }
      });

      //adding only chat window whose name is not present  in the list of permenant side contact.
      // console.log('line 626 error auto matically adding the chat page already existing');

      if (windowFlag == true) {
        msgPrivate[nochatWindow] = document.createElement("div");
        msgPrivate[nochatWindow].classList.add("msg_private");
        msgPrivate[nochatWindow].classList.add("contdark");
        msgPrivate[nochatWindow].classList.add(userName);
        bodyTag.appendChild(msgPrivate[nochatWindow]);
        msgPrivate[nochatWindow].addEventListener("pointerdown", () => {
          headIcon.style.scale = "0.7";
          headIcon.style.left = "0";
          headIcon.style.top = "0";
        });

        nochatWindow++;
      }
      windowFlag = true;

      //created and appending the list.

      s_barUListR.appendChild(listofUserR[i]);

      //writing the button
      listBtnR[i] = document.createElement(activUser.typeB);
      listBtnR[i].classList.add("listBtn");
      listBtnR[i].classList.add(userName);
      listofUserR[i].appendChild(listBtnR[i]);

      // writing the user icon
      iconofUserR[i] = document.createElement(activUser.typeS);
      iconofUserR[i].classList.add("material-symbols-outlined");
      iconofUserR[i].classList.add(userName);
      iconofUserR[i].classList.add("iconPosition");

      listBtnR[i].appendChild(iconofUserR[i]);
      iconofUserR[i].innerHTML = "person";

      // writing the user name inside the button
      listnameR[i] = document.createElement(activUser.typeS);
      listnameR[i].classList.add("pseudoClass");
      listnameR[i].classList.add(userName);
      listBtnR[i].appendChild(listnameR[i]);
      if (userName == name) {
        listnameR[i].innerHTML = userName + " (me)";
      } else {
        listnameR[i].innerHTML = userName;
        // creating a room for each left side bar permenant user
        if (userName != name + " (me)") {
          room[userName] = [userName, name].sort().join("-");
          socket.emit("join-room", room[userName], userName);
          //here giving the room name as the front and user name in alphabetical sorted sequence separated by hyphen.
        }
      }
      // i++;
    });
  }

  //apke join hone k baad koi join hota toh
  else {
    //   when another user is enetred in the group chat then checking its name in the left list then alloting it a chat window

    windowFlag = true;
    // when user is connecting in the group chat then already existed users window creation.
    listnameL.forEach((leftname) => {
      if (
        leftname.innerHTML.trim().split(/\s+/)[0] ===
        activUser.content[activUser.no - 1]
      ) {
        windowFlag = false;
      }
    });

    msgPrivate.forEach((chatWindow) => {
      if (chatWindow.classList[2] == activUser.content[activUser.no - 1]) {
        windowFlag = false;
      }
    });
    //adding only chat window whose name is not present  in the list of permenant side contact.
    if (windowFlag == true) {
      msgPrivate[nochatWindow] = document.createElement("div");
      msgPrivate[nochatWindow].classList.add("msg_private");
      msgPrivate[nochatWindow].classList.add("contdark");
      msgPrivate[nochatWindow].classList.add(
        activUser.content[activUser.no - 1]
      );
      msgPrivate[nochatWindow].addEventListener("pointerdown", () => {
        headIcon.style.scale = "0.7";
        headIcon.style.left = "0";
        headIcon.style.top = "0";
      });
      bodyTag.appendChild(msgPrivate[nochatWindow]);

      nochatWindow++;
    }
    windowFlag = true;

    listofUserR[activUser.no - 1] = document.createElement(activUser.type);
    listofUserR[activUser.no - 1].classList.add("pseudoClass");
    listofUserR[activUser.no - 1].classList.add(
      activUser.content[activUser.no - 1]
    );
    //  created and appending the list.

    s_barUListR.appendChild(listofUserR[activUser.no - 1]);

    //writing the button
    listBtnR[activUser.no - 1] = document.createElement(activUser.typeB);
    listBtnR[activUser.no - 1].classList.add("listBtn");
    listBtnR[activUser.no - 1].classList.add(
      activUser.content[activUser.no - 1]
    );
    listofUserR[activUser.no - 1].appendChild(listBtnR[activUser.no - 1]);

    // writing the user icon
    iconofUserR[activUser.no - 1] = document.createElement(activUser.typeS);
    iconofUserR[activUser.no - 1].classList.add("material-symbols-outlined");
    iconofUserR[activUser.no - 1].classList.add(
      activUser.content[activUser.no - 1]
    );
    iconofUserR[activUser.no - 1].classList.add("iconPosition");
    listBtnR[activUser.no - 1].appendChild(iconofUserR[activUser.no - 1]);
    iconofUserR[activUser.no - 1].innerHTML = "person";

    // writing the user name inside the button
    listnameR[activUser.no - 1] = document.createElement(activUser.typeS);
    listBtnR[activUser.no - 1].appendChild(listnameR[activUser.no - 1]);
    listnameR[activUser.no - 1].classList.add("pseudoClass");
    listnameR[activUser.no - 1].classList.add(
      activUser.content[activUser.no - 1]
    );
    if (activUser.content[activUser.no - 1] == name) {
      listnameR[activUser.no - 1].innerHTML =
        activUser.content[activUser.no - 1] + " (me)";
    } else {
      listnameR[activUser.no - 1].innerHTML =
        activUser.content[activUser.no - 1];
      // creating a room for each left side bar permenant user
      if (activUser.content[activUser.no - 1] != name + " (me)") {
        room[activUser.content[activUser.no - 1]] = [
          activUser.content[activUser.no - 1],
          name,
        ]
          .sort()
          .join("-");
        socket.emit(
          "join-room",
          room[activUser.content[activUser.no - 1]],
          activUser.content[activUser.no - 1]
        );
        //here giving the room name as the front and user name in alphabetical sorted sequence separated by hyphen.
      }
    }
  }

  listBtnR.forEach((singleBtn) => {
    singleBtn.addEventListener("pointerdown", handleBtnclick);
    // opening the privateMsg when clicked on once

    // index
  });
});

socket.on("message", (data) => {
  inMsg("group", data);
  msgContent.scrollTop = msgContent.scrollHeight;
});

socket.on("personalMsg", (data) => {
  console.log("personalMsg");
  // data[1] is the name of the sender
  // data[0] is the actual data;
  inMsg(data[1], data[0]);
});

// user left remove the rlistbtn and if it is require then its chat window.
socket.on("user-has-left", (data) => {
  for (index = 0; index < nochatWindow; index++) {
    if (msgPrivate[index].classList[2] === data.name) {
      // checking that the user left do exist in leftside bar
      // if yes then dont deletes its chatwindow
      // if the user that left donnot exost in left side bar
      //then deletes its formed chatwindow;
      windowFlag = true;
      listnameL.forEach((leftname) => {
        if (leftname.innerHTML.trim().split(/\s+/)[0] === data.name) {
          windowFlag = false;
        }
      });
      if (windowFlag == true) {
        msgPrivate[index].remove();
        nochatWindow--;
      }
      //to make the windowFlag to true since once it become false then it will make it again true .for future windowFlag comparison.
      windowFlag = true;
    }
  }
  notifyMsg(data, "pink");
});
// user sending message
// applyting the condition to the format of data object gebnerated here.using headtext bar.
sendBtn.addEventListener("pointerdown", () => {
  if (msgInput.value != "") {
    var ctime = new Date();
    if (headtext.innerHTML == "Welcome To ChatBook !") {
      data = {
        name,
        value: msgInput.value,
        time: ctime.toLocaleString(),
      };
    } else {
      data = {
        from: name,
        name: headtext.innerHTML.trim().split(/\s+/)[0],
        value: msgInput.value,
        time: ctime.toLocaleString(),
        to: headtext.innerHTML.trim().split(/\s+/)[0],
      };
    }
    // data='<h5>'+name+ '</h5>'+msgInput.value+'<h6>' +ctime.toLocaleString()+'</h6>';
    if (msgPrivate[index].style.left != "auto") {
      socket.emit("message", data);
      console.log("Pblic msg emitted", room[data.name]);
      outMsg("group", data);
    } else {
      socket.emit("personalMsg", name, data, room[data.name]);
      console.log("personal msg emitted", room[data.name]);
      outMsg(data.name, data);
    }
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && msgInput.value != "") {
    var ctime = new Date();
    if (headtext.innerHTML == "Welcome To ChatBook !") {
      data = {
        name,
        value: msgInput.value,
        time: ctime.toLocaleString(),
      };
    } else {
      data = {
        from: name,
        name: headtext.innerHTML.trim().split(/\s+/)[0],
        value: msgInput.value,
        time: ctime.toLocaleString(),
        to: headtext.innerHTML.trim().split(/\s+/)[0],
      };
    }
    // data='<h5>'+name+ '</h5>'+msgInput.value+'<h6>' +ctime.toLocaleString()+'</h6>';
    // if (msgPrivate[index].style.left != "auto") {
    if (msgContent.style.display != "none") {
      socket.emit("message", data);
      console.log("pblic msg emitted", room[data.name]);
      outMsg("group", data);
    } else {
      socket.emit("personalMsg", name, data, room[data.name]);

      outMsg(data.name, data);
    }
  }
});

// dark- light mode
switchmode.addEventListener("pointerdown", () => {
  if (mode == "dark") {
    togglePos.classList.remove("toggleAop");
    togglePos.classList.add("toggleOp");
    msgContent.classList.add("contLight");
    msgContent.classList.remove("contdark");
    msgPrivate.forEach((window) => {
      window.classList.add("contLight");
      window.classList.remove("contdark");
    });
    msgInput.style.borderColor = "purple";
    msgInput.style.color = "#5b295b";
    headBar.style.backgroundColor = "rgb(10, 75, 75)";
    s_barDivL.style.backgroundColor = "rgb(10, 75, 75)";
    s_barDivR.style.backgroundColor = "rgb(10, 75, 75)";
    s_barDivL.style.color = "black";
    s_barDivR.style.color = "black";

    mode = "light";
  } else {
    togglePos.classList.add("toggleAop");
    togglePos.classList.remove("toggleOp");
    msgContent.classList.remove("contLight");
    msgContent.classList.add("contdark");
    msgPrivate.forEach((window) => {
      window.classList.remove("contLight");
      window.classList.add("contdark");
    });

    msgInput.style.borderColor = "black";
    msgInput.style.color = "black";
    headBar.style.backgroundColor = "rgb(9 27 27)";
    s_barDivL.style.backgroundColor = "rgb(9 27 27)";
    s_barDivR.style.backgroundColor = "rgb(9 27 27)";
    s_barDivL.style.color = "white";
    s_barDivR.style.color = "white";
    mode = "dark";
  }
});

headIcon.addEventListener("pointerdown", () => {
  if (headIcon.style.scale != "4") {
    headIcon.style.scale = "4";
    headIcon.style.left = "20vw";
    headIcon.style.top = "25vh";
  } else {
    headIcon.style.scale = "0.7";
    headIcon.style.left = "0";
    headIcon.style.top = "0";
  }
});

msgInput.addEventListener("input", () => {
  msgInput.style.height = "auto";
  msgInput.style.height = msgInput.scrollHeight + "px";
  msgInput.value = msgInput.value.replace(/\n/g, "");

  // console.log(msgInput.style.height,msgInput.scrollHeight,msgInput.value);
  if (msgInput.value == "") {
    msgInput.style.height = "40px";
  }
  // console.log('yes');
});
