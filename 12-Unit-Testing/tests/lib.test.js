const lib = require("../lib");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    // bad practice
    expect(result).toBe("Welcome Mosh");
    // good practice
    expect(result).toMatch(/Mosh/);
    // or
    expect(result).toContain("Mosh");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    // Too General (Bad Practice)
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // Too Specific (Bad Practice)
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");

    expect(result.length).toBe(3);

    // Ideal
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);

    // incorrect approach
    // expect(result).toBe({ id: 1, price: 10 });

    expect(result).toEqual({ id: 1, price: 10 });

    expect(result).toMatchObject({ id: 1, price: 10 });
    // expect(result).toHaveProperty('id', "1");
    expect(result).toHaveProperty("id", 1);
  });
});
