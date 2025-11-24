import { brokenImageSource } from "./common/const";
import "./styles/brokenScreen.scss";

const BrokenScreenComponent = () => {
  return (
    <div className="brokenWrapper">
      <img src={brokenImageSource} alt="something is broken" />
      <h2>Something is broken</h2>
    </div>
  );
}

export default BrokenScreenComponent;