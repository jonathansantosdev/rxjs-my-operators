import { pipe } from "rxjs";
import { map } from "rxjs/operators";

// Pipe para verificar os paramêtros
const checkPayload = (entityDefinition, parse = val => val) => {
  const checkEntity = entity => {
    if (!(entityDefinition instanceof Array)) return false;

    const getTypes = value => value.split("|");
    const getNotNull = value => value.match(/^([a-zA-Z]+[^:]*)(:notNull)?$/);
    const checkType = (type, value) => typeof value === value;
    const checkIsNotNull = value => value === ":notNull";
    const errors = [];

    entityDefinition.forEach(validation => {
      if (typeof validation !== "string") return;
      const [types, notNull] = [
        getTypes(getNotNull(validation)[1]),
        getNotNull(validation)[2]
      ];
      let typeIsOkay = false;
      let notNullIsOkay = false;

      console.log(types, notNull);
    });

    return errors.length > 0 ? errors : false;
  };

  return pipe(
    map(val => {
      const entityIsWrong = checkEntity(val);

      if (entityIsWrong) {
        throw parse(entityIsWrong, val);
      }

      return val;
    })
  );
};

export { checkPayload };
