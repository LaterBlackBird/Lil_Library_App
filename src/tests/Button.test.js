import React from "react";
import { render, screen } from "@testing-library/react-native";

import Button from '../app/components/atoms/Button';

describe("<Button />", () => {
  test("should render given text", () => {
    const text = "test";
    const mockFn = jest.fn();
    render(<Button text={text} onPress={mockFn} />);

    const component = screen.getByText('test');

    expect(component).toBeTruthy;
  });
});