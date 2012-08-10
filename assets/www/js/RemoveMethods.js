function RemoveStudent(e){

    var array_index = e.target.getAttribute("number");
    if(CurrentStudent == Students[array_index]) { CurrentStudent = null; }
    Students.splice(array_index,1);

     Application.UpdateAllContent();
}



