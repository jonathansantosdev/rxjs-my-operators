import "./styles.css";
import { of } from "rxjs";
import { map } from "rxjs/operators";

import { checkPayload } from "./operators";

of("Seja bem-vindo ao playground do RXJS!")
  .pipe(map(val => `<h1 style="text-align: center;">${val}</h1>`))
  .subscribe(val => document.write(val));

of({
  id: null,
  name: "Jonathan",
  age: null
})
  .pipe(checkPayload(["id|number|string", "name|string", "age|number:notNull"]))
  .subscribe();
