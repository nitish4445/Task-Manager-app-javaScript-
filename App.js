const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
    console.log("dragStart");
}

function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}

all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
    //   console.log("dragOver");
}

function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
}

function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}

function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dropped");
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});

close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (event) => {
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");
todo_submit.addEventListener("click", createTodo);

function createTodo() {
    const input_val = document.getElementsByClassName("todo_inputs");
    const taskInput = input_val[0].value;
    const descriptionInput = input_val[1].value;
  
    if (taskInput.trim() === "") {
      return;
    }
  
    const todo_div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("div");
  
    h3.textContent = taskInput;
    p.textContent = descriptionInput;
    h3.setAttribute("class", "inline");
    p.setAttribute("class", "ellipsis");
  
    todo_div.appendChild(h3);
    todo_div.appendChild(p);
  
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
  
    const span = document.createElement("span");
    const span_txt = document.createTextNode("Task Destroy");
    span.classList.add("close");
    span.appendChild(span_txt);
  
    todo_div.appendChild(span);
  
    // Reopen button
    const reopenBtn = document.createElement("button");
    reopenBtn.textContent = "Update";
    reopenBtn.classList.add("reopen-btn");
    todo_div.appendChild(reopenBtn);
  
    const no_status = document.getElementById("no_status");
    no_status.appendChild(todo_div);
  
    span.addEventListener("click", () => {
      span.parentElement.style.display = "none";
    });
  
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);
  
    reopenBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event bubbling
  
      const parentDiv = event.target.parentNode;
      const descriptionModal = parentDiv.querySelector(".modal");
  
      if (descriptionModal) {
        descriptionModal.classList.add("active");
        overlay.classList.add("active");
      } else {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
          <div class="header">
            <div class="title2">Edit Description</div>
            <button class="btn close-modal">&times;</button>
          </div>
          <div class="body">
            <label>Enter updated description:</label>
            <input type="text" class="todo_inputs" value="${p.textContent}"/>
            <button id="save_description">Save</button>
          </div>
        `;
  
        const closeModal = modal.querySelector(".close-modal");
        closeModal.addEventListener("click", () => {
          modal.classList.remove("active");
          overlay.classList.remove("active");
        });
  
        const saveBtn = modal.querySelector("#save_description");
        saveBtn.addEventListener("click", () => {
          const updatedDescription = modal.querySelector(".todo_inputs").value;
          p.textContent = updatedDescription;
          modal.classList.remove("active");
          overlay.classList.remove("active");
        });
  
        parentDiv.appendChild(modal);
        overlay.classList.add("active");
      }
    });
  
    const todo_form = document.getElementById("todo_form");
    input_val[0].value = "";
    input_val[1].value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
  }
      
 const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.parentElement.style.display = "none";
    });
});
  
