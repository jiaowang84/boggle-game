import { getShuffledLetters } from './GameUtil';

it('should get random letters with length 16', () => {
    expect(getShuffledLetters()).toHaveLength(16);
});