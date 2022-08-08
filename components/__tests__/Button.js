import React from "react";
import renderer from 'react-test-renderer';
import Button from '../atoms/Button';

describe('<Button />', () => {
  test('has 1 child', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree.children.length).toBe(1);
  });
})