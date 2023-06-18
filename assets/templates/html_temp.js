function addSubTaskTempHtml(i){
    return`
    <div class="sub-container-task">
        <input type="checkbox" name="Subtask ${i + 1}">
        <p>${newAddedSubtasks[i]}</p>
    </div>
    `
}

function popupAddTaskHtml(){
    return`
    <div class="popup-task">
        <div class="popup-background">
            <h2 class="header-task">
                Add Task
            </h2>
            <div class="task-detail">
                <div class="task-left">
                    <div class="title">
                        <h3>Title</h3>
                        <input type="text" placeholder="Enter a Title">
                    </div>
                    
                    <div class="description">
                        <h3>Description</h3>
                        <textarea placeholder="Enter a Description"></textarea>
                    </div>
            
                    <div class="category">
                        <h3>
                            Category
                        </h3>
                        <div class="dropdown-category">
                            <div class="dropdown-title">
                                <span>Select task category</span>
                                <img src="../assets/img/arrow-down.svg" alt="" id="showCategory">
                            </div>
                            <div class="dropdown-content-cat hide">
                                <a href="">New category </span></a>
                                <a href="">Sales<span class="dot dot-red"></span></a>
                                <a href="" class="zero-padding">Backoffice<span class="dot dot-pink"></span></a>
                            </div>
                        </div>
                        <div class="assigned">
                            <h3>
                                Assigned to
                            </h3>
                            <div class="dropdown-category">
                                <div class="dropdown-title">
                                    <span>Select contacts to assign</span>
                                    <img src="../assets/img/arrow-down.svg" alt="" id="showAssignedTo">
                                </div>
                                <div class="dropdown-content-con hide">
                                    <a href="">You <input type="checkbox"></span></a>
                                    <a href="">Maximilian Vogel <input type="checkbox"></span></a>
                                    <a href="" class="zero-padding">Invite new contact</span></a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <hr>
            <div class="task-right">
                <div class="due-date">
                    <h3>
                        Due date
                    </h3>
                    <input type="date">
                </div>
        
            <div class="prio">
                <h3>
                    Prio
                </h3>
                <div class="prio-button">
                    <button id="urgent">Urgent<img src="../assets/img/urgent-prio.svg"></button>
                    <button id="medium">Medium<img src="../assets/img/medium-prio.png"></button>
                    <button id="low">Low <img src="../assets/img/low-prio.svg" alt=""></button>
                </div>
            </div>
        
            <div class="subtasks">
                <h3>Subtasks</h3>
                <input type="text" placeholder="Add new Subtasks" id="new-subtask">
                <img src="../assets/img/plus-sign.svg">
                <div class="subtask-check">
                    <input type="checkbox" name="Subtask 1" id="" >
                    <p>Subtask 1</p>
                </div>
            </div>
            <div class="add-clear-btn">
                <button id="clear-task">
                    Clear
                    <img src="../assets/img/close.svg" alt="">
                </button> 
                <button id="create-task">
                    Create Task
                    <img src="../assets/img/check.svg" alt="">
                </button>
            </div>
            </div>

    </div>
</div>
    `
}

function showNewCategoryHTML(){
    return`
        <div class="dropdown-category-cat">
            <div class="dropdown-title-new">
                <input id="new-cat-value" class="input-color" placeholder="New Category Name"></input>
                <div class="add-delete-new">
                    <div onclick="addNewCategory()">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div onclick="clearNewCategory()">
                        <img src="../assets/img/close.svg" id= "cross" >
                    </div>
                </div>
        </div>
    `
}

function showNewContactHTML(){
    return`
    <div class="dropdown-category-con-new">
        <div class="dropdown-title-new">
            <input id="new-con-value" class="input-color" placeholder="Contact Email" type="email"></input>
            <div class="add-delete-new">
                <div onclick="createNewContact()">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div onclick="clearNewContact()">
                    <img src="../assets/img/close.svg" id= "cross">
                </div>
            </div>
        </div>
    </div> 
    `
}










