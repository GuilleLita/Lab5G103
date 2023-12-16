import React from 'react';
import  AsyncSelect, { useAsync } from 'react-select/async';
import  ReactSelect from 'react-select';
import { useState } from 'react';
import {useRef} from 'react';
import config from '../config'

//import fetch from 'node-fetch';
import './AddHallway.css';
import { get } from 'http';
import Input from 'react-select/dist/declarations/src/components/Input';

import AddHallwayViewModel from '../viewmodel/AddHallwayViewModel';
import buildingService from '../services/buildingService';
import { hallwayService } from '../services/hallwayService';
import { visitIterationBody } from 'typescript';




function AddHallway() {
    let viewmodel = new AddHallwayViewModel(buildingService.instance, hallwayService.instance);    
    const [floor1Options, setFloor1Options] = useState<any[]>([]);
    const [floor2Options, setFloor2Options] = useState<any[]>([]);

    const [selected, setSelected] = useState({ value: '', label: ''});
    const [selected2, setSelected2] = useState({ value: '', label: ''});
    const [floorSelected, setFloorSelect] = useState({ value: '', label: ''});
    const [floorSelected2, setFloorSelect2] = useState({ value: '', label: ''});
    type SelectOptionType = { label: string, value: string }

    const position1 = useRef<any>(null);
    const position2 = useRef<any>(null);
    
    const customStyles = {
        control: (base:any) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 200,
          minWidth: 200
        
        })
      };


    const promiseOptions = () =>
        new Promise<any[]>((resolve) => {  
            
            resolve(viewmodel.fetchBuildings());
        }
    );

    const handleInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            
            setSelected(option)
            setFloor1Options(await viewmodel.searchFloors(option.value));
          }
    }

    const handleInputChange2 =async (option: SelectOptionType | null) => {
        if (option) {
            
            setSelected2(option)
            setFloor2Options(await viewmodel.searchFloors(option.value));
          }
    }

    const handleFloorInputChange2 =async (option: SelectOptionType | null) => {
        if (option) {
            setFloorSelect2(option)
          }
    }

    const handleFloorInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            setFloorSelect(option)
          }
    }

    const OnClickListner = async () =>{
        if (position1.current !== null && position2.current !== null) {
            let input1 = position1.current.value
            let input2 = position2.current.value   
            let hallwayOrError = viewmodel.setHallway(selected.value, selected2.value, floorSelected.value, floorSelected2.value, input1, input2)
            if ((await hallwayOrError).isFailure) {
                alert((await hallwayOrError).errorValue())
            } else {

                alert("Hallway added")
            }
        }
    }


    return (
        <div className="Hallway-body">
            <h1>Add Hallway</h1>
            <div className="Hallway-Form">
                <div className="Hallway-Form-Field">
                    <label htmlFor="building1">Building 1</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                    <label htmlFor="floor1">Floor</label>
                    <ReactSelect styles={customStyles} isSearchable={false} options={floor1Options} onChange={handleFloorInputChange}/>
                </div>
                <div className="Hallway-Form-Field">
                    <label htmlFor="building2">Building 2</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange2} />
                    <label htmlFor="floor2">Floor</label>
                    <ReactSelect styles={customStyles} isSearchable={false} options={floor2Options} onChange={handleFloorInputChange2} />
                </div>
                
            </div>
            <div className='PositionForm'>
                <label htmlFor="position">Position in bulilding 1:  </label>
                <input ref={position1} type="text" id="position1" name="name" className='input' />
                <input ref={position2} type="text" id="position2" name="name" className='input' />

            </div>
            <button className="submit" onClick={OnClickListner} >Create Hallway</button>
        </div>

    );
}

export default AddHallway;

