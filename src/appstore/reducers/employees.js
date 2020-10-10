export default (employeesState = [], action) => {
   let newState = [...employeesState];

   switch(action.type){
      case "EMPLOYEE_READ_OK" : {
         newState.push(action.payload);
         return newState;
      }
      case "EMPLOYEE_LIST_OK": {
         console.log('@reducer: employeeReducer',action.payload);
         return [...action.payload]
      }
      case "EMPLOYEE_ADD_OK":   return [...newState, action.payload]
      case "EMPLOYEE$PHOTO_EDIT_OK": {
         console.log(action.payload);
         let employee = newState.find(e => e._id === action.payload._id)
         employee.photo = action.payload;
         return newState;
      }
      default: return newState;
   }
}
