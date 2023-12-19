# Lab5G103

## API
### Edificio
  Para crear edificio /api/building/create

### Piso
  Para crear piso /api/floor/create (falta implentacion)
  
  Cada piso contiene un array de numeros [**(Grid)**](https://github.com/GuilleLita/Lab5G103/edit/main/README.md#grid-del-piso) que identifican la celda de cada piso con un numero, dependiendo del numero esa celda tiene pared Oeste y/o Norte, ademas de identificar si tiene una puerta.
  #### Grid del piso
    
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
    
