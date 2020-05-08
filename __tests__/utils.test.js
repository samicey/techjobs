const utils = require("../libs/utils")

describe('Utils Module',()=>{

  test('Add 2 numbers correctly', ()=>{
    const a = 1;
    const b = 2;
    expect(utils.add(a,b)).toBe(3);
  })
  
  it('Should add 2 numbers correctly', ()=>{
    const a = 1;
    const b = 2;
    expect(utils.add(a,b)).toBe(3);
  })
})