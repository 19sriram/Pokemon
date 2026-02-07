import SlideDrawer from "../slideDrawerComponent";
import { mount } from "enzyme";
import { pokemonMockData } from "../__mocks__/mockData";
let wrapper;

it("expects sideDrawer  to be shown", () => {
  wrapper = mount(<SlideDrawer show={true} />);
  expect(wrapper.find("div").at(0).prop("className")).toEqual(
    "side-drawer open"
  );
  wrapper = mount(<SlideDrawer show={false} />);
  expect(wrapper.find("div").at(0).prop("className")).toEqual("side-drawer");
});

it("expects sideDrawer to populate data", () => {
  wrapper = mount(
    <SlideDrawer show={true} selectedPokemon={pokemonMockData} />
  );
  expect(wrapper.find("#pokemonImg").at(0).prop("alt")).toEqual("ivysaur");
});

it("expects sideDrawer to load broken when no data is present", () => {
  wrapper = mount(<SlideDrawer show={true} selectedPokemon={[]} />);
  expect(wrapper.find("img").at(0).prop("alt")).toEqual("something is broken");
});
