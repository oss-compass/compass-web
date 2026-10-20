/**
 * The manager is a singleton whose listeners are registered by its constructor, so every
 * test loads a fresh module registry to get an instance with its own listeners.
 */
const loadManager = () => {
  jest.resetModules();
  const TrackingManager = require('./TrackingManager').default;
  return TrackingManager.getInstance();
};

describe('TrackingManager event listeners', () => {
  it('reports a module stay on pagehide while it is active', () => {
    const manager = loadManager();
    const reportSpy = jest
      .spyOn(manager as any, 'reportModuleStay')
      .mockImplementation(() => {});
    jest.spyOn(manager as any, 'flushReports').mockImplementation(() => {});

    window.dispatchEvent(new Event('pagehide'));

    expect(reportSpy).toHaveBeenCalledTimes(1);

    reportSpy.mockRestore();
  });

  it('stops listening and reporting after destroy()', () => {
    const manager = loadManager();
    const reportSpy = jest
      .spyOn(manager as any, 'reportModuleStay')
      .mockImplementation(() => {});
    const flushSpy = jest
      .spyOn(manager as any, 'flushReports')
      .mockImplementation(() => {});

    manager.destroy();

    const flushesAfterDestroy = flushSpy.mock.calls.length;

    window.dispatchEvent(new Event('pagehide'));
    window.dispatchEvent(new Event('beforeunload'));
    document.dispatchEvent(new Event('visibilitychange'));

    expect(reportSpy).not.toHaveBeenCalled();
    expect(flushSpy.mock.calls.length).toBe(flushesAfterDestroy);

    reportSpy.mockRestore();
    flushSpy.mockRestore();
  });
});
