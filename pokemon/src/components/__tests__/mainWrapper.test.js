import { mount, shallow } from "enzyme";
import * as React from "react";
import { fetchPokemonData } from "../common/api";
import { allPokemonData } from "../__mocks__/mockData";
import mockAxios from "../__mocks__/axios";
import MainWrapper from "../mainWrapper";
import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() => {
  Promise.resolve(() => {
    json: () => {
      Promise.resolve({
        allPokemonData,
      });
    };
  });
});

beforeEach(() => {
  let wrapper = shallow(<MainWrapper />);
});

afterEach(() => {
  jest.clearAllMocks();
});

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");

let response;

it("executes async call as for default one", async () => {
  await act(async () => {
    await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: allPokemonData })
    );
    response = await fetchPokemonData("pokemon", 50);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith("pokemon", {
      params: { limit: 50, offset: undefined },
    });
    expect(response.data.data.count).toEqual(50);
    expect(response.data.data.results.length).toEqual(50);
    expect(response.data.data.next).toEqual(
      "https://pokeapi.co/api/v2/pokemon?offset=50&limit=50"
    );
    let wrapper = mount(<MainWrapper />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find("Button").at(1).props("disabled")).toBeTruthy();
    expect(wrapper.find("Button").at(0).props("disabled")).toBeTruthy();
    expect(wrapper.find("Button").at(1).props("children").children).toEqual(
      "Next"
    );
    expect(wrapper.find("Button").at(0).props("children").children).toEqual(
      "Prev"
    );
  });
});
