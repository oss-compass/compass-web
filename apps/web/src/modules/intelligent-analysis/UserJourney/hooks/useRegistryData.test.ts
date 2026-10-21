import {
  resolveFileKeyFromRegistry,
  type RegistryData,
  type RegistryEntry,
} from './useRegistryData';

const entry: RegistryEntry = {
  projectKey: 'example',
  label: 'Example',
  version: 'v1',
  org: 'test',
  sig: 'test',
  projectName: 'Example',
  hardware_access: 'local',
  operating_system: 'debian-13',
};

const registry: RegistryData = {
  entries: { example_v1: entry },
  defaultFileMap: { example: 'example_v1' },
  fallbackProject: 'example_v1',
  projectOptions: [],
  compareProjectOptions: [],
  versionOptionsMap: {},
  fileKeyToProjectKey: {},
  versionMap: {},
  labelMap: {},
};

describe('resolveFileKeyFromRegistry', () => {
  it.each(['constructor', 'toString', '__proto__', 'hasOwnProperty'])(
    'rejects the unregistered project %s',
    (project) => {
      expect(resolveFileKeyFromRegistry(project, registry)).toBeNull();
    }
  );

  it.each(['example_v1', ' example_v1.json ', '%65xample_v1.JSON', 'example'])(
    'resolves the registered project %s',
    (project) => {
      expect(resolveFileKeyFromRegistry(project, registry)).toBe('example_v1');
    }
  );

  it.each(['constructor', '__proto__', 'hasOwnProperty'])(
    'accepts %s when it is an explicitly registered file key',
    (project) => {
      const data = {
        ...registry,
        entries: Object.fromEntries([[project, entry]]),
      };
      expect(resolveFileKeyFromRegistry(project, data)).toBe(project);
    }
  );

  it('resolves an explicitly registered project alias named constructor', () => {
    const data = {
      ...registry,
      defaultFileMap: { constructor: 'example_v1' },
    };
    expect(resolveFileKeyFromRegistry('constructor', data)).toBe('example_v1');
  });

  it.each([null, undefined, '', 'unknown', '../example_v1'])(
    'keeps an absent or invalid selection unresolved: %s',
    (project) => {
      expect(resolveFileKeyFromRegistry(project, registry)).toBeNull();
    }
  );

  it('waits until the registry is available', () => {
    expect(resolveFileKeyFromRegistry('example_v1', undefined)).toBeNull();
  });
});
