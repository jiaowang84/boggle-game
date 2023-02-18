import { formatTimerString } from './TimerUtil';

it('should format time with correct padding', () => {
    expect(formatTimerString(10,5)).toBe('10:05');
    expect(formatTimerString(2,5)).toBe('02:05');
    expect(formatTimerString(0,0)).toBe('00:00');
});