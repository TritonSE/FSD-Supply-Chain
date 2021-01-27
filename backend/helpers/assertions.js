class Assertions {
  /**
   * Get the type of a value, similar to the typeof operator.
   * @param value The value to check the type of.
   * @returns A string representing the value's type.
   */
  static typeOf(value) {
    if (value === null) {
      return "null";
    } else if (Array.isArray(value)) {
      return "array";
    } else {
      return typeof value;
    }
  }

  /**
   * Assert that a value's type matches the expected type.
   * @param value The value to check.
   * @param expectedTypeString The expected result of typeOf(value).
   */
  static assertType(value, expectedTypeString) {
    const actualTypeString = Assertions.typeOf(value);
    if (actualTypeString !== expectedTypeString) {
      throw new Error(`: expected "${expectedTypeString}", got "${actualTypeString}"`);
    }
  }

  /**
   * Assert that the value is a function.
   * @param value The value to check.
   */
  static assertFunction(value) {
    Assertions.assertType(value, "function");
  }

  /**
   * Assert that the value is a number.
   * @param value The value to check.
   */
  static assertNumber(value) {
    Assertions.assertType(value, "number");
  }

  /**
   * Assert that the value is a string.
   * @param value The value to check.
   */
  static assertString(value) {
    Assertions.assertType(value, "string");
  }

  /**
   * Assert that the value is a string representing a date.
   * @param value The value to check.
   */
  static assertDateString(value) {
    Assertions.assertString(value);

    if (isNaN(Date.parse(value))) {
      throw new Error(`: "${value}" is not a valid date string`);
    }
  }

  /**
   * Assert that a function returns truthy for the given value.
   * @param value The value to check.
   * @param isValid A function which returns whether the value is valid.
   * @param description An optional string describing the assertion.
   */
  static assertCustom(value, isValid, description) {
    if (!isValid(value)) {
      throw new Error(`: assertion "${description || isValid.toString()}" failed`);
    }
  }

  /**
   * Assert that the value is an array.
   * @param value The value to check.
   * @param elementAssertion An optional assertion for each element in the array.
   */
  static assertArray(value, elementAssertion) {
    Assertions.assertType(value, "array");

    if (elementAssertion !== undefined) {
      for (let i = 0; i < value.length; i++) {
        try {
          elementAssertion(value[i]);
        } catch (e) {
          throw new Error(`[${i}]` + e.message);
        }
      }
    }
  }

  /**
   * Assert that the value is an object.
   * @param value The value to check.
   * @param assertions An optional map of object keys to object value assertions.
   */
  static assertObject(value, assertions) {
    Assertions.assertType(value, "object");

    for (const key in value) {
      if (assertions[key] === undefined) {
        throw new Error(`.${key}` + ": unexpected attribute present");
      }
    }

    for (const [key, assertion] of Object.entries(assertions)) {
      try {
        if (value[key] === undefined) {
          throw new Error(": required attribute missing");
        } else {
          assertion(value[key]);
        }
      } catch (e) {
        throw new Error(`.${key}` + e.message);
      }
    }
  }
}

module.exports = Assertions;
