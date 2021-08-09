import { brokenImageSource } from "../common/const";
import "./brokenScreen.scss";

export default function Broken() {
  return (
    <div className="brokenWrapper">
      <img src={brokenImageSource} alt="something is broken" />
      <h2>Something is broken</h2>
    </div>
  );
}
