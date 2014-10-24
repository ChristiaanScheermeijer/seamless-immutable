var Immutable = require("../seamless-immutable.js");
var JSC       = require("jscheck");
var TestUtils = require("./TestUtils.js");
var assert    = require("chai").assert;
var _         = require("lodash");

describe("Immutable", function() {
  it("converts multiple arguments into an array, but leaves single arguments alone", function() {
    TestUtils.check(100, [JSC.array()], function(args) {
      var immutable = Immutable.apply(Immutable, args);

      if (args.length > 1) {
        assert.deepEqual(immutable, Immutable(args));
      } else if (isNaN(immutable) && isNaN(args[0])) {
        assert.ok(true);
      } else {
        assert.strictEqual(immutable, args[0]);
      }
    })
  });

  it("makes an Immutable Array when passed a mutable array", function() {
    TestUtils.check(100, [JSC.array()], function(mutable) {
      var immutable = Immutable(mutable);

      assert.deepEqual(immutable, mutable);
      assert.isTrue( Immutable.isImmutable(immutable));
      assert.isFalse(Immutable.isImmutable(mutable));
    });
  });

  it("makes an Immutable Object when passed a mutable object", function() {
    TestUtils.check(100, [JSC.object()], function(mutable) {
      var immutable = Immutable(mutable);

      assert.typeOf(immutable, "object")
      assert.isTrue( Immutable.isImmutable(immutable));
      assert.isFalse(Immutable.isImmutable(mutable));
    });
  });

  // These are already immutable, and should pass through Immutable() untouched.
  _.each({
    "string":    JSC.string(),
    "number":    JSC.number(),
    "boolean":   JSC.boolean(),
    "null":      JSC.literal(null),
    "undefined": JSC.literal(undefined)
  }, function(specifier, type) {
    it("simply returns its argument when passed a value of type " + type, function() {
      TestUtils.check(100, [specifier], function(value) {
        assert.strictEqual(Immutable(value), value);
      });
    });
  });
});