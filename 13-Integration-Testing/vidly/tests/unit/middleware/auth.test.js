const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");
const mongoose = require("mongoose");

describe("Auth Middleware", () => {
  it("should populate request.user with the payload of a valid JSON Web Token", () => {
    const userPayload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };

    const token = new User(userPayload).generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(userPayload);
  });
});
