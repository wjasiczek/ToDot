$(function () {
    var storedData = sessionStorage.getItem("ToDoList");
    var tableDiv = $("#ToDos");

    if (storedData) {
        var toDos = JSON.parse(storedData);
        var input;
        var text;

        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].isStriked === "true") {
                input = "<input type='checkbox'checked />";
                text = "<del>" + toDos[i].text + "</del>";
            } else {
                input = "<input type='checkbox'/>";
                text = toDos[i].text;
            }
            
            tableDiv.append(AddTr(input, text));
        }
    }

    function UpdateMessage(message) {
        var messageLabel = $("#AddMessage");
        messageLabel.html(message);
        messageLabel.stop(true, true);
        messageLabel.fadeTo(1000, 1);
        messageLabel.delay(2000).fadeTo(1000, 0);
    }

    function AddToDo() {
        var toDos = [];
        var storedData = sessionStorage.getItem("ToDoList");
        var toDoText = $("#ToDoArea").val();
        if (toDoText === "") {
            UpdateMessage("<b>Describe your ToDo!</b>");
            return;
        }
        $("#ToDoArea").val("");
        
        if (storedData) {
            toDos = JSON.parse(storedData);
        }

        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].text === toDoText) {
                UpdateMessage("<b>This ToDo already exists!</b>");
                return;
            }
        }

        toDos.push({ "text": toDoText, "isStriked": "false" });
        sessionStorage.setItem("ToDoList", JSON.stringify(toDos));
        var input = "<input type='checkbox'/>";

        tableDiv.append(AddTr(input, toDoText));
    }

    function RemoveToDo() {
        var toDos = JSON.parse(sessionStorage.getItem("ToDoList"));
        var toDoTd = $(this).closest("tr").children("td:eq(1)");

        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].text === toDoTd.text()) {
                toDos.splice(i, 1);
            }
        }
        $(this).parent().remove();
        sessionStorage.setItem("ToDoList", JSON.stringify(toDos));
    }

    function StrikeText() {
        var checkbox = $(this).children(":checkbox");
        var toDos = JSON.parse(sessionStorage.getItem("ToDoList"));
        var toDoTd = checkbox.closest("tr").children("td:eq(1)");

        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].text === toDoTd.text()) {
                if (checkbox.is(":checked")) {
                    toDoTd.wrapInner("<del>");
                    toDos[i].isStriked = "true";
                } else {
                    toDoTd.html(toDos[i].text);
                    toDos[i].isStriked = "false";
                }
            }
        }

        sessionStorage.setItem("ToDoList", JSON.stringify(toDos));
    }

    function AddTr(input, text) {
        return "<tr><td style='width: 5%'>" + input + "</td><td style='width: 80%'>" + text + "</td><td style='width: 10%'><input type='button' value='remove' /></td></tr>";
    }


    $("#AddToDoButton").click(AddToDo);
    $(".table").on("change", "tr>td:first-child", StrikeText);
    $(".table").on("click", "tr>td:nth-child(3)", RemoveToDo);
});