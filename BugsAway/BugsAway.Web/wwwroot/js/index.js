
function PopulateBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    getStatusAsync()
        .then(data => data.forEach(status => {
            board.appendChild(CreateStatusSection(status));
            feather.replace();
        }));
}

function PopulateProjects() {
    const container = document.getElementById("projects");

    getProjectAsync()
        .then(data => data.forEach(project => {
            container.prepend(CreateProjectSection(project));
        }));
}

function PopulateTickets() {

    getTicketAsync()
        .then(data => data.forEach(ticket => {
            let target = document.querySelector(`div[data-statusid = '${ticket.status.statusId}']`);
            target.prepend(CreateTickets(ticket));
            feather.replace();

        }));

}

function InitializeComponents() {

    PopulateBoard();
    PopulateProjects();
    PopulateTickets();

    document.getElementById("projects").appendChild(CreateAddButton("Project",null,"Add New Project"));
    document.getElementById("projects").getElementsByClassName("card-add")[0].classList.add("project-container");
    feather.replace();
    // get from hidden field
    let id = document.getElementById("Employee_EmployeeId").value;
    sessionStorage.setItem("UserId", id);
    
    PopulateIssuesList();
    AddProjectButton();

}

window.onload = InitializeComponents

$('#actionModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let action = button.data('action').toLowerCase()
    let origin = button.data('origin').toLowerCase()
    let value = button.data('value')

    let card = null;
    cardData = {}


    if (origin.includes("ticket-card")) {
        // from ticket card
        card = button.parent();
        cardData["employeeId"] = card.data('employee');
        cardData["issueId"] = card.data('issue');
        cardData["priorityId"] = card.data('priority');
        cardData["statusId"] = card.data('status');

    } else if (origin.includes("ticket")) {
        cardData["statusId"] = value;
    }

    let modal = $(this)
    modal.find('.modal-title').text(`${action} ${origin}`)

    document.getElementById("modal-form").innerHTML = "";
    if (origin.includes("issue")) {
        CreateIssueForm(null, null, "Create");

    } else if (origin.includes("ticket-card")) {

        if (action.includes("edit")) {
            CreateTicketForm(value, cardData, "Edit");

        } else if (action.includes("delete")) {
            CreateDeleteTicketMessage(value);
            document.getElementById("btn-modal").onclick = function () { DeleteTicket(); };
        }

    } else if (origin.includes("ticket")) {
        CreateTicketForm(value, cardData, "Create");
    } else if (origin.includes("project")) {
        ComingSoon();
    }

})

function ComingSoon() {
    let container = document.getElementById("modal-form");
    container.appendChild(CreateElement("label","","Coming Soon."));
}

function DeleteTicket() {

    let id = document.getElementById('btn-modal').dataset.value;

    deleteTicketAsync(id).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            PopulateBoard();
            PopulateTickets();
        })
        .catch(data => {
            console.log('Error:', data);
        });

    delete document.getElementById('btn-modal').dataset;
}

function CreateDeleteTicketMessage(value) {
    let container = document.getElementById("modal-form");
    container.textContent = "Are you sure you want to delete this ticket?";
    let button = document.getElementById("btn-modal");
    button.textContent = "Delete";
    button.className = "btn btn-danger";
    button.dataset.value = value;
}

function CreateTicketForm(selectedId = null, ticket = null, btnText = null) {
    let container = document.getElementById("modal-form");

    getIssueAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select","select-issue", "Issue", data, "issueId", "title", ticket["issueId"])));
    getEmployeeAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select","select-employee", "Employee", data, "employeeId", "name", ticket["employeeId"])));
    getPriorityAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select","select-priority", "Priority", data, "priorityId", "title", ticket["priorityId"])));
    getStatusAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select","select-status", "Status", data, "statusId", "title", ticket["statusId"])));

    let button = document.getElementById("btn-modal");
    button.onclick = function () { SubmitTicketForm(selectedId, btnText); }
    button.textContent = btnText;
    button.className = "btn btn-primary";

    return container;
}


function SubmitTicketForm(id, action) {
    let employeeId = document.getElementById('select-employee').value;
    let issueId = document.getElementById('select-issue').value;
    let priorityId = document.getElementById('select-priority').value;
    let statusId = document.getElementById('select-status').value;
    let currentUser = sessionStorage.getItem("UserId");

    data = {}

    data["employeeId"] = employeeId;
    data["issueId"] = issueId;
    data["priorityId"] = priorityId;
    data["statusId"] = statusId;
    if (action.toLowerCase() === "create") {
        data["createdBy"] = currentUser;
    }
    

    SubmitAction(id, data, action.toLowerCase(), currentUser);


}

function SubmitAction(id, ticket, action, userId) {


    if (action === "create") {
        postTicketAsync(userId, ticket).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                PopulateBoard();
                PopulateTickets();
            })
            .catch(data => {
                console.log('Error:', data);
            });
    } else if (action === "edit") {

        ticket["ticketId"] = id.toString();
        updateTicketAsync(id, userId, ticket)
            .then(data => {
                console.log('Success:', data);
                PopulateBoard();
                PopulateTickets();
            })
            .catch(data => {
                console.log('Error:', data);
            });
    }

}
