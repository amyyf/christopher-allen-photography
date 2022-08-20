import { generatePageTitle } from '../utils';

describe('generatePageTitle', () => {
  it('generates the home page title', () => {
    const expected = 'Christopher Allen Photography: Home';
    const generated = generatePageTitle('/');
    expect(generated).toEqual(expected);
  });

  it('generates the albums nav page title', () => {
    const expected = 'Christopher Allen Photography: Albums';
    const generated = generatePageTitle('/albums');
    expect(generated).toEqual(expected);
  });

  it('dynamically generates an album page title', () => {
    const expected = 'Christopher Allen Photography: Landscapes';
    const generated = generatePageTitle('/albums/something', '', 'Landscapes');
    expect(generated).toEqual(expected);
  });

  it('dynamically generates an image page title', () => {
    const expected = 'Christopher Allen Photography: Snowy Lakeside';
    const generated = generatePageTitle(
      '/albums/something/anything',
      'Snowy Lakeside',
      'anything else',
    );
    expect(generated).toEqual(expected);
  });

  it('falls back if an unexpected page path occurs', () => {
    const expected = 'Christopher Allen Photography';
    const generated = generatePageTitle('/404');
    expect(generated).toEqual(expected);
  });
});
