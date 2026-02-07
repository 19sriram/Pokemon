import HeaderComponent from "../headerComponent/headerComponent";
import { pokemonLogo } from "../common/const";
import { mount } from "enzyme";

let wrapper;

it("expects headerComponent to be loaded", () => {
  wrapper = mount(<HeaderComponent />);

  expect(wrapper.find("img").props().src).toEqual(pokemonLogo);
});

it("expects action when isloading is false ", () => {
  expect(wrapper.find("button").at(1).prop("disabled")).toEqual(true);
  wrapper = mount(
    <HeaderComponent
      isLoading={false}
      prevPageURL="http://pokemon.io"
      nextPageURL="http://pokemon.io"
      drawerOpen={false}
    />
  );
  expect(wrapper.find("button").at(1).prop("disabled")).toEqual(false);
  expect(wrapper.find("button").at(2).prop("disabled")).toEqual(false);
});

it("expects action when isloading is true ", () => {
  wrapper = mount(<HeaderComponent isLoading={true} />);
  expect(wrapper.find("button").at(1).prop("disabled")).toEqual(true);
  expect(wrapper.find("button").at(2).prop("disabled")).toEqual(true);
});
