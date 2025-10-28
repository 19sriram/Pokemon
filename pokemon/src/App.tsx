import { Profiler } from "react";
import MainWrapper from "./components/mainWrapper";
import FormWrapper from "./components/formWrapper";
import TodoListComponent from "./todoComponents/todoComponent";
import PaginationComponent from "./components/paginationComponents";
import TaskComponent from "./components/taskComponent/index.js";

function onRenderCallback(
   id:string,
  phase:string,
  actualDuration:number,
  baseDuration:number,
  startTime:number,
  commitTime:number,
) {
  //console.log(id,phase, actualDuration)
}

function App() {
  return (
    // <Profiler id="app" onRender={onRenderCallback}>
    <>
      {/* <MainWrapper/> */}
      {/* <FormWrapper/> */}
      {/* <TodoListComponent/> */}
    {/* <PaginationComponent/> */}
      <TaskComponent/>
    </>
    // </Profiler>
    );
}

export default App;
