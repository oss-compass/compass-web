export function sleep(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}
