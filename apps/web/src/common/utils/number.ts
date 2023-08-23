export function numberFormatK(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

// min and max included
export function randomFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function toFixed(n: number, d: number): number {
  if (String(n).indexOf('.') === -1) {
    return n;
  }
  return Number(n.toFixed(d));
}

// https://github.com/super-ienien/percent-round
// eslint-disable-next-line complexity
export function percentRound(ipt: number[], precision?: number) {
  if (!precision) {
    precision = 0;
  }
  if (!Array.isArray(ipt)) {
    throw new Error('percentRound input should be an Array');
  }
  const iptPercents = ipt.slice();
  const length = ipt.length;
  const out = new Array(length);

  let total = 0;
  for (let i = length - 1; i >= 0; i--) {
    if (typeof iptPercents[i] === 'string') {
      iptPercents[i] = Number.parseFloat(String(iptPercents[i]));
    }
    total += iptPercents[i] * 1;
  }
  if (isNaN(total)) {
    throw new Error('percentRound invalid input');
  }

  if (total === 0) {
    out.fill(0);
  } else {
    const powPrecision = Math.pow(10, precision);
    const pow100 = 100 * powPrecision;
    let check100 = 0;
    for (let i = length - 1; i >= 0; i--) {
      iptPercents[i] = (100 * iptPercents[i]) / total;
      check100 += out[i] = Math.round(iptPercents[i] * powPrecision);
    }

    if (check100 !== pow100) {
      const totalDiff = check100 - pow100;
      const roundGrain = 1;
      let grainCount = Math.abs(totalDiff);
      const diffs = new Array(length);

      for (let i = 0; i < length; i++) {
        diffs[i] = Math.abs(out[i] - iptPercents[i] * powPrecision);
      }

      while (grainCount > 0) {
        let idx = 0;
        let maxDiff = diffs[0];
        for (let i = 1; i < length; i++) {
          if (maxDiff < diffs[i]) {
            // avoid negative result
            if (check100 > pow100 && out[i] - roundGrain < 0) {
              continue;
            }
            idx = i;
            maxDiff = diffs[i];
          }
        }
        if (check100 > pow100) {
          out[idx] -= roundGrain;
        } else {
          out[idx] += roundGrain;
        }
        diffs[idx] -= roundGrain;
        grainCount--;
      }
    }

    if (powPrecision > 1) {
      for (let i = 0; i < length; i++) {
        out[i] = out[i] / powPrecision;
      }
    }
  }

  return out;
}

export function countDecimalPlaces(number: number) {
  if (isNaN(number)) return 0;
  const numberString = number.toString();
  const decimalIndex = numberString.indexOf('.');
  if (decimalIndex === -1) {
    return 0;
  }

  return numberString.length - decimalIndex - 1;
}
