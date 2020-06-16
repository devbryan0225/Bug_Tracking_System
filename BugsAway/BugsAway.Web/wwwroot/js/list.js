
function AddProjectButton() {
    let table = document.getElementById("table-issue-container");
    table.appendChild(CreateAddButton("Issue",null,"Add New Issue"));
}

function PopulateIssuesList() {

    getIssueAsync().then(issues => {

        console.info(issues)
        let result = issues.map(i => {
            let data = {}
            data["issue"] = i.title;
            data["feature"] = i.feature.title;
            data["project"] = i.feature.project.title;
            
            return data;
        })
        console.info(result)

        let table = document.getElementById("table-issues-body");
        table.innerHTML = "";
        result.forEach((i, ind) => {
            table.appendChild(CreateTableRow(i, ind))
        })
    })

}

function CreateTableRow(issue, num) {
    let row = CreateElement("tr");
    let itemHeader = CreateElement("th", null, num +1);
    itemHeader.setAttribute("scope", "row");
    row.appendChild(itemHeader);

    let i = CreateElement("td", null, issue["issue"]);
    let f = CreateElement("td", null, issue["feature"]);
    let p = CreateElement("td", null, issue["project"]);

    row.appendChild(i);
    row.appendChild(f);
    row.appendChild(p);

    
    return row;
}


function CreateIssueForm(selectedId = null, issue = null, btnText = null) {
    let container = document.getElementById("modal-form");

    // text box
    
    container.appendChild(CreateFormGroup("input", "text-issue-title", "Issue Title", null, null, null, null));
    container.appendChild(CreateFormGroup("input", "text-issue-description", "Issue Description", null, null, null, null));

    // update features when changed project

    getFeatureAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select","select-feature", "Feature", data, "featureId", "title", null)));
    getProjectAsync()
        .then(data => container
            .appendChild(CreateFormGroup("select","select-project", "Project", data, "projectId", "title", null)));
    
    let button = document.getElementById("btn-modal");
    button.onclick = function () { SubmitIssueForm(); }
    button.textContent = btnText;
    button.className = "btn btn-primary";

    return container;
}


function SubmitIssueForm() {
    let issueTitleId = document.getElementById('text-issue-title').value;
    let issueDescId = document.getElementById('text-issue-description').value;
    let featureId = document.getElementById('select-feature').value;
    let projectId = document.getElementById('select-project').value;

    issue = {}

    issue["title"] = issueTitleId;
    issue["description"] = issueDescId;
    issue["featureId"] = featureId;

    postIssueAsync(issue).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            PopulateIssuesList();
        })
        .catch(data => {
            console.log('Error:', data);
        });
}
