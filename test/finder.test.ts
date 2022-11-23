import { DependenciesFinder } from '../src';
import * as loadPackage from '../src/load-package';

const loadPackageMock = jest.spyOn(loadPackage, 'loadPackageContent');

describe('DependenciesFinder', () => {
  afterEach(() => {
    loadPackageMock.mockReset();
  });
  it('works', () => {
    // Given
    const finder = new DependenciesFinder();
    const packageContent = {
      name: 'A',
      dependencies: {
        a: '1.1.0',
      },
    };
    loadPackageMock.mockReturnValue(packageContent);
    // When
    const result = finder.getDependencies();
    // Then
    expect(result).toEqual({ a: '1.1.0' });
  });

  it('works2', () => {
    // Given
    const finder = new DependenciesFinder();

    // @ts-ignore
    loadPackageMock.mockImplementation((path: string) => {
      switch (path) {
        case '.':
          return {
            name: 'A',
            dependencies: {
              a: '1.1.0',
              B: 'workspace:*',
            },
          };
        case 'node_modules/B':
          return {
            name: 'B',
            dependencies: {
              b: '0.0.1',
            },
          };
      }
      throw new Error(path);
    });
    // When
    const result = finder.getDependencies();
    // Then
    expect(result).toEqual({ a: '1.1.0', b: '0.0.1' });
  });
});
