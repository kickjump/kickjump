declare module NodeJS {
  interface Global {
    chai: Chai.ChaiStatic;
    sinon: Sinon.SinonStatic;
    expect: Chai.ExpectStatic;
    should: Chai.Should;
  }
}