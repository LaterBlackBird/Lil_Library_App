import React from "react";
import { render, screen } from "@testing-library/react-native";
import renderer from 'react-test-renderer';

import Button from '../Button';

describe("<Button />", () => {
  test("has 1 child", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  test("renders given text", () => {
    const text = "test";
    const mockFn = jest.fn();
    render(<Button text={text} onPress={mockFn} />);

    const component = screen.getByText('test');

    expect(component).toBeTruthy;
  });
});