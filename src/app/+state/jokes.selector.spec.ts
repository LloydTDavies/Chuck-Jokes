import { State } from './jokes.reducer';
import { selectFeature, selectJokes, selectLoading } from './jokes.selector';

describe('Jokes selectors', () => {
  const initialState: State = {
    jokes: [
      { id: 'joke-1', value: 'blahh' } as any,
      { id: 'joke-2', value: 'blahh-1' } as any,
    ],
    loading: false,
  };
  describe('selectFeature', () => {
    it('should return state', () => {
      const result = selectFeature.projector(initialState);
      expect(result).toEqual(initialState);
    });
  });
  describe('selectJokes', () => {
    it('Should return an array of jokes', () => {
      const result = selectJokes.projector(initialState);

      expect(result.length).toEqual(2);
      expect(result[1].id).toEqual('joke-2');
    });
  });

  describe('selectLoading', () => {
    it('Should return an array of favorite jokes', () => {
      const result = selectLoading.projector(initialState);

      expect(result).toBeFalsy();
    });
  });
});
