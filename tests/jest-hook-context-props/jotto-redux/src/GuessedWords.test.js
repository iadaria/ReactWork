import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from './GuessedWords';



const defaultProps = {
    guessedWords: [
        { guessedWord: 'train', letterMatchCount: 3 },
    ],
};


const setup = (props = {}, state = null) => {
  const setupProps = {...defaultProps, ...props};
  const wrapper = shallow(<GuessedWords {...setupProps} />);

  if (state) wrapper.setState(state);

  return wrapper;
};

test("renders without error", () => {
//   const wrapper = setup({ success: false });
//   const component = findByTestAttr(wrapper, "component-congrats");
//   expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are not words quessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    });
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instructions to quess a word', () => {
        const component = findByTestAttr(wrapper, 'guess-instructions');
        expect(component.text().length).not.toBe(0);
    });
});

describe('if there are words quessed', () => {
    let wrapper;
    let guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3},
        { guessedWord: 'agile', letterMatchCount: 1},
        { guessedWord: 'party', letterMatchCount: 5},
    ];

    beforeEach(() => {
        wrapper = setup({ guessedWords });
    });

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders "quessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('correct number of guessed words', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNode.length).toBe(guessedWords.length);
    });
})