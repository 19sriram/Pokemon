import { Profiler } from "react";
import MainWrapper from "./components/mainWrapper";


function onRenderCallback(
   id:string,
  phase:string,
  actualDuration:number,
  baseDuration:number,
  startTime:number,
  commitTime:number,
  interactions:any,
) {
  console.log(id,phase, actualDuration)
}

function App() {
  return (
    <Profiler id="app" onRender={onRenderCallback}>
    <>
      <MainWrapper/>
    </>
    </Profiler>
    );
}

export default App;
