const { capitalise, formatDate } = require('./utils.js')
// just testing the happy path 

describe('capitalise', () => {
    it('returns the word capitalised if given a string', () => {
        expect(capitalise('hello')).toBe('Hello')
    });
})
describe('formatDate', () => {
    it('returns a string of the correct format', () => {
        expect(formatDate('2018-05-30T15:59:13.341Z')).toBe('2018-05-30 at 15:59')
    });
});