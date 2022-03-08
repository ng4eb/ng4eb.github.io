import { WithoutHashPipe } from './without-hash.pipe';

describe('WithoutHashPipe', () => {
  it('create an instance', () => {
    const pipe = new WithoutHashPipe();
    expect(pipe).toBeTruthy();
  });
});
