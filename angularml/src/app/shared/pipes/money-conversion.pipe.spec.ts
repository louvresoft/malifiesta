import { MoneyConversionPipe } from './money-conversion.pipe';

describe('MoneyConversionPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyConversionPipe();
    expect(pipe).toBeTruthy();
  });
});
