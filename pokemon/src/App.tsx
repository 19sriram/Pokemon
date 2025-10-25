import { Profiler } from "react";
import MainWrapper from "./components/mainWrapper";
import FormWrapper from "./components/formWrapper";


function onRenderCallback(
   id:string,
  phase:string,
  actualDuration:number,
  baseDuration:number,
  startTime:number,
  commitTime:number,
  interactions:any,
) {
  //console.log(id,phase, actualDuration)
}

function App() {
  return (
    <Profiler id="app" onRender={onRenderCallback}>
    <>
      <MainWrapper/>
      {/* <FormWrapper/> */}
    </>
    </Profiler>
    );
}

export default App;
