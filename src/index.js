import "./styles.css";
import { of } from "rxjs";
import { map } from "rxjs/operators";

// Pipe para verificar os paramêtros
of("Seja bem-vindo ao playground do RXJS!")
  .pipe(map(val => `<h1 style="text-align: center;">${val}</h1>`))
  .subscribe(val => document.write(val));
