const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];

    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");

    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 }; // Points > 10 to trigger discount
    };

    // Order object
    const order = { customerId: 1, totalPrice: 10 };

    // Call the function under test
    lib.applyDiscount(order);

    // Assert discount applied
    expect(order.totalPrice).toBe(9); // 10% discount
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      return { id: customerId, email: "a@example.com" };
    };

    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true; // Track that send was called
    };

    const order = { customerId: 1 };
    lib.notifyCustomer(order);

    expect(mailSent).toBe(true);
  });
});

// using Jest Mock functions
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // Arrange: mock db.getCustomerSync
    db.getCustomerSync = jest.fn().mockReturnValue({
      email: "a@example.com",
    });

    mail.send = jest.fn();

    const order = { customerId: 1 };
    lib.notifyCustomer(order);

    expect(mail.send).toHaveBeenCalled();

    // Assert: check arguments passed to mail.send
    expect(mail.send.mock.calls[0][0]).toBe("a@example.com"); // first argument
    expect(mail.send.mock.calls[0][1]).toMatch(/order/); // second argument contains 'order'
  });
});
