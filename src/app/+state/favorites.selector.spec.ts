import { selectFavorites } from './favorites.selector';

describe('favorites selectors', () => {
  describe('selectFavorites', () => {
    it('Should return an array of favorite jokes', () => {
      const result = selectFavorites.projector({
        loading: false,
        favorites: [{ id: 'joke-2' }],
      });

      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual('joke-2');
    });
  });
});
