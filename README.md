# Lab5G103

## API
### Edificio
  Para crear edificio /api/building/create

### Piso
  Para crear piso /api/floor/create (falta implentacion)
  
  Cada piso contiene un array de numeros [**(Grid)**](https://github.com/GuilleLita/Lab5G103/edit/main/README.md#grid-del-piso) que identifican la celda de cada piso con un numero, dependiendo del numero esa celda tiene pared Oeste y/o Norte, ademas de identificar si tiene una puerta.
  #### Grid del piso
        GRID:
        -------------------------------
        Number |   0   |  N  |  Porta
           1   |  yes  | yes |  yes
           2   |  yes  | yes |  no
           3   |  yes  | no  |  yes
           4   |  yes  | no  |  no
           5   |  no   | yes |  yes
           6   |  no   | yes |  no
           7   |  no   | no  |  yes
           8   |  no   | no  |  no
        -------------------------------
    
