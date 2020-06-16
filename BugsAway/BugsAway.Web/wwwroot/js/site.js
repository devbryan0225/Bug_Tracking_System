// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const apiUrl = "https://localhost:44301/api/";

async function getStatusAsync() {
    let response = await fetch(apiUrl + "status/");
    let data = await response.json();
    return data;
}

async function getProjectAsync() {
    let response = await fetch(apiUrl + "projects/");
    let data = await response.json();
    return data;
}

async function getTicketAsync(id = "") {
    let response = await fetch(`${apiUrl}tickets/${id}`);
    let data = await response.json();
    return data;
}

async function getIssueAsync() {
    let response = await fetch(apiUrl + "issues/");
    let data = await response.json();
    return data;
}

async function getEmployeeAsync() {
    let response = await fetch(apiUrl + "employees/");
    let data = await response.json();
    return data;
}

async function getPriorityAsync() {
    let response = await fetch(apiUrl + "priorities/");
    let data = await response.json();
    return data;
}

async function getFeatureAsync() {
    let response = await fetch(apiUrl + "features/");
    let data = await response.json();
    return data;
}

async function postTicketAsync(userId, data) {
    let response = await fetch(`${apiUrl}tickets/${userId}`, {
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

async function postIssueAsync(data) {
    let response = await fetch(`${apiUrl}issues/`, {
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

async function updateTicketAsync(id, modId, data) {
    let response = await fetch(`${apiUrl}tickets/${id}/${modId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    //let resp = await response.json();
    return response;

}

async function deleteTicketAsync(id) {
    let response = await fetch(`${apiUrl}tickets/${id}`, {
        method: 'DELETE'
    });

    return response;
};

function CreateElement(elementName = "div", className = null, content = null, href = null) {
    let element = document.createElement(elementName);
    if (className !== null) { element.className = className; }
    element.textContent = content;
    if (href !== null) { element.href = href; }
    return element;
}

function CreateStatusSection(status) {
    let container = CreateElement("div", "status-container text-center m-1");
    let statusCard = CreateElement("div", "card bg-secondary");
    let statusCardBody = CreateElement("div", "card-body");
    let header = CreateElement("h5", "card-text text-white", status.title);
    statusCardBody.appendChild(header);
    statusCard.appendChild(statusCardBody);

    let body = CreateElement("div", "card-body");
    body.dataset.statusid = status.statusId;
    body.appendChild(CreateAddButton(`${status.title} Ticket`, status.statusId, `Add New '${status.title}' Ticket`));
    container.appendChild(statusCard);
    container.appendChild(body);

    return container;
}

function CreateProjectSection(project) {
    let container = CreateElement("div", "card project-container m-2 card-shadow");
    let image = document.createElement("img");
    image.src = "/img/monitoring-well.jpg";
    image.className = "card-img-top";
    let summary = CreateElement("div", "card-body");
    summary.appendChild(CreateElement("h5", "card-title", project.title));
    summary.appendChild(CreateElement("p", "card-text", project.description));

    let action = CreateElement("div", "card-body");
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
    let container = CreateElement("div", `card small text-left mb-2 card-shadow text-white ticket-card ${priorityClass[ticket.priority.priorityId]}`);
    container.dataset.issue = ticket.issue.issueId;
    container.dataset.employee = ticket.employee.employeeId;
    container.dataset.priority = ticket.priority.priorityId;
    container.dataset.status = ticket.status.statusId;

    let body = CreateElement("div", "card-body");

    let title = CreateElement("h5", "card-title", `0${ticket.ticketId} ${ticket.issue.title}`);
    let text = CreateElement("p", "card-text", ticket.issue.description);
    let label = CreateElement("label", "", ticket.employee.name);
    let close = CreateElement("button", "close position-absolute text-white ticket-close");
    close.setAttribute("type", "button");
    close.setAttribute("aria-label", "Close");
    close.dataset.action = "Delete";
    close.dataset.origin = "ticket-card";
    close.dataset.value = ticket.ticketId;
    close.dataset.toggle = "modal";
    close.dataset.target = "#actionModal";
    let closeIcon = CreateElement("span", "", "×");
    closeIcon.setAttribute("aria-hidden", "true");
    close.appendChild(closeIcon);

    let edit = CreateElement("div", "position-absolute text-white ticket-edit");
    edit.dataset.action = "Edit";
    edit.dataset.origin = "ticket-card";
    edit.dataset.value = ticket.ticketId;
    edit.dataset.toggle = "modal";
    edit.dataset.target = "#actionModal";

    let editIcon = document.createElement("i");
    editIcon.dataset.feather = "edit";
    editIcon.style.color = "white";
    edit.appendChild(editIcon);

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(label);
    container.appendChild(edit);
    container.appendChild(close);
    container.appendChild(body);
    return container;
}

const priorityClass = {
    1: "bg-danger",
    2: "bg-warning",
    3: "bg-info"
}

function CreateAddButton(origin = "", value = null, tooltip = "") {
    let container = CreateElement("div", "card card-add card-shadow");
    container.setAttribute("title", tooltip);
    let body = CreateElement("div", "card-body d-flex justify-content-center align-items-center");
    body.dataset.toggle = "modal";
    body.dataset.target = "#actionModal";
    body.dataset.action = "Create New";
    body.dataset.origin = origin;
    body.dataset.value = value;

    let icon = document.createElement("i");
    icon.dataset.feather = "plus-circle";
    icon.style.color = "gray";

    body.appendChild(icon);
    container.appendChild(body);
    return container;
}

function CreateFormGroup(type = "", id = "", title = "", list = null, optionValue = null, optionText = null, selectedId = null) {
    let container = CreateElement("div", "form-group");
    let label = CreateElement("label", "col-form-label", title);
    label.setAttribute("for", id);
    let formType = CreateElement(type, "form-control");
    formType.id = id;


    if (type === "select") {
        list.forEach(function (item) {

            let option = CreateElement("option", "", item[optionText]);
            option.value = item[optionValue];
            if (parseInt(option.value, 10) === selectedId) { option.selected = true; }

            formType.appendChild(option);
        });
    } else if (type === "input") {
        formType.setAttribute("type", "text");
    }
        

    container.appendChild(label);
    container.appendChild(formType);

    return container;
}


