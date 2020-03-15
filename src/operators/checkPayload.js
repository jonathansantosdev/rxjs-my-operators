import { pipe } from "rxjs";
import { map } from "rxjs/operators";

// Pipe para verificar os paramêtros
const checkPayload = (entityDefinition, parse = val => val) => {
  const isNullOrUndefined = value => value == null;
  const checkEntity = entity => {
    if (!(entityDefinition instanceof Array)) return false;

    const getTypes = value => value.split("|");
    const getNotNull = value => value.match(/^([a-zA-Z]+[^:]*)(:notNull)?$/);
    // Função para verificar os tipos
    const checkTypes = (types, value) => {
      for (const type of types) {
        if (typeof value === type) {
          return true;
        }
      }

      return false;
    };
    const errors = [];

    entityDefinition.forEach(validation => {
      if (typeof validation !== "string") return;

      const [types, notNull] = [
        getTypes(getNotNull(validation)[1]),
        getNotNull(validation)[2]
      ];
      const propertyName = types.shift();
      let typeIsOkay = false;
      let notNullIsOkay = false;
      const entityHasValue = !isNullOrUndefined(entity[propertyName]);
      const errorsProperty = [];

      if (entityHasValue) {
        notNullIsOkay = true;

        if (types && types.length > 0) {
          const typesIsValid = checkTypes(types, entity[propertyName]);
          if (typesIsValid) {
            typeIsOkay = true;
          }
        }
      }

      if (!notNull) {
        notNullIsOkay = true;
      }

      if (!types.length) {
        typeIsOkay = true;
      }

      if (!typeIsOkay) {
        errorsProperty.push({ errorType: "type", errors: types });
      }

      if (!notNullIsOkay) {
        errorsProperty.push({ errorType: "notNull" });
      }

      if (errorsProperty.length > 0) {
        errors.push(parse({ propertyName, errors: errorsProperty }));
      }
    });

    return errors.length > 0 ? errors : false;
  };

  return pipe(
    map(val => {
      const entityIsWrong = checkEntity(val);
      console.log(entityIsWrong);

      if (entityIsWrong) {
        throw entityIsWrong;
      }

      return val;
    })
  );
};

export { checkPayload };
