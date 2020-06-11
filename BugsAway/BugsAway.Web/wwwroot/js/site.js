// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const apiUrl = "https://api.bugsaway.bryanyeo.dev/";

async function getStatusAsync() {
    let response = await fetch(apiUrl +"api/status/");
    let data = await response.json();
    return data;
}

async function getProjectAsync() {
    let response = await fetch(apiUrl +"api/projects/");
    let data = await response.json();
    return data;
}

async function getTicketAsync() {
    let response = await fetch(apiUrl +"api/tickets/");
    let data = await response.json();
    return data;
}

async function getIssueAsync() {
    let response = await fetch(apiUrl +"api/issues/");
    let data = await response.json();
    return data;
}

async function getEmployeeAsync() {
    let response = await fetch(apiUrl +"api/employees/");
    let data = await response.json();
    return data;
}

async function getPriorityAsync() {
    let response = await fetch(apiUrl +"api/priorities/");
    let data = await response.json();
    return data;
}

// ----------- Common Functions ----------- 

function CreateElement(elementName = "div", className = null, content = null, href = null) {
    let element = document.createElement(elementName);
    element.className = className;
    element.textContent = content;
    if (href !== null) { element.href = href; }
    return element;
}

function CreateStatusSection(status) {
    let container = CreateElement("div","status-container card text-center m-1");
    let header = CreateElement("div","card-header", status.title);
    
    let body = CreateElement("div", "card-body");
    body.dataset.statusid = status.statusId;
    body.appendChild(CreateAddButton(`${status.title} Ticket`));
    container.appendChild(header);  
    container.appendChild(body);
    
    return container;
}

function CreateProjectSection(project) {
    let container = CreateElement("div","card project-container m-2 card-shadow");
    let image = document.createElement("img");
    image.src = "/img/monitoring-well.jpg";
    image.className = "card-img-top";
    let summary = CreateElement("div", "card-body");
    summary.appendChild(CreateElement("h5", "card-title", project.title));
    summary.appendChild(CreateElement("p", "card-text", project.description));

    let action = CreateElement("div","card-body");
    action.appendChild(CreateElement("a", "card-link", "Add Features", href = "#"));

    let list = CreateElement("ul", "list-group list-group-flush");
    project.feature.forEach(function (f) {
        let item = CreateElement("li", "list-group-item", content = f.description);
        list.appendChild(item);
    });

    container.appendChild(image);
    container.appendChild(summary);
    container.appendChild(action);
    container.appendChild(list);
    return container;
}

function CreateTickets(ticket) {
    let container = CreateElement("div", `card small text-left card-shadow text-white ${priorityClass[ticket.priority.priorityId]}`);

    let body = CreateElement("div", "card-body");
    let title = CreateElement("h5", "card-title", ticket.issue.title);
    let text = CreateElement("p", "card-text", ticket.issue.description);
    body.appendChild(title);
    body.appendChild(text);
    container.appendChild(body);
    return container;
}

const priorityClass = {
    1: "bg-danger",
    2: "bg-warning",
    3: "bg-info"
}

function CreateAddButton(origin = "") {
    let container = CreateElement("div", "card card-add card-shadow");
    let body = CreateElement("div", "card-body d-flex justify-content-center align-items-center");
    body.dataset.toggle = "modal";
    body.dataset.target = "#actionModal";
    body.dataset.action = "Create New";
    body.dataset.origin = origin;

    let icon = document.createElement("i");
    icon.dataset.feather = "plus-circle";
    icon.style.color = "gray";

    body.appendChild(icon);
    container.appendChild(body);
    return container;
}

function CreateFormGroup(id = "", title = "", list = null, optionValue = null, optionText = null) {
    let container = CreateElement("div", "form-group");
    let label = CreateElement("label", "col-form-label", title);
    label.setAttribute("for",id);
    let select = CreateElement("select", "form-control selectpicker");
    select.id = id;

    list.forEach(function (item) {
        
        let option = CreateElement("option","", item[optionText] );
        option.value = item[optionValue];
        
        select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(select);

    return container;
}

function CreateTicketForm() {
    let container = document.getElementById("modal-form");
    getIssueAsync()
        .then(data => container
                .appendChild(CreateFormGroup("select-issue", "Issue", data, "issueId", "title")));
    getEmployeeAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select-employee", "Employee", data, "employeeId", "name")));
    getPriorityAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select-priority", "Priority", data, "priorityId", "title")));
    getStatusAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select-status", "Status", data, "statusId", "title")));


    return container;
}

// -------------------------------------------

function PopulateBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    getStatusAsync()
        .then(data => data.forEach(function (status) {
            board.appendChild(CreateStatusSection(status));
            feather.replace();
        }));        
}

function PopulateProjects() {
    const container = document.getElementById("projects");
    
    getProjectAsync()
        .then(data => data.forEach(function (project) {
            container.prepend(CreateProjectSection(project));
        }));
}

function PopulateTickets() {

    getTicketAsync()
        .then(data => data.forEach(function (ticket) {
            console.log(ticket);
            let target = document.querySelector(`div[data-statusid = '${ticket.status.statusId}']`);
            target.prepend(CreateTickets(ticket));
        }));
}

function InitializeComponents() {
    PopulateBoard();
    PopulateProjects();
    PopulateTickets();

    document.getElementById("projects").appendChild(CreateAddButton("Project"));
    feather.replace();
}

window.onload = InitializeComponents

$('#actionModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let action = button.data('action')
    let origin = button.data('origin')
    
    let modal = $(this)
    modal.find('.modal-title').text(`${action} ${origin}`)
        
    document.getElementById("modal-form").innerHTML = "";
    if (origin.toLowerCase().includes("ticket")) {
        CreateTicketForm();
    }

})

document.getElementById("btn-modal").onclick = function () {
    let employeeId = document.getElementById('select-employee').value;
    let issueId = document.getElementById('select-issue').value;
    let priorityId = document.getElementById('select-priority').value;
    let statusId = document.getElementById('select-status').value;

    data = {}

    data["employeeId"] = employeeId;
    data["issueId"] = issueId;
    data["priorityId"] = priorityId;
    data["statusId"] = statusId;
    
    postTicketAsync(data).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Success:', data);
            PopulateBoard();
            PopulateTickets();
        })
        .catch(data => {
            console.log('Error:', data);
            alert('Error:', data);
        });
    
};

async function postTicketAsync(data) {
    let response = await fetch(apiUrl+'api/tickets/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    //let resp = await response.json();
    return response;
        
}