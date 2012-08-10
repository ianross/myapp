function EditChangeName(){

    var NewName = $('#NewNameInput').val();

    if(NewName != "") {
        CurrentStudent.name = NewName;
    }

    Application.UpdateAllContent();
}

function EditRemoveImage(){

}

function EditRemoveNote(){

}


