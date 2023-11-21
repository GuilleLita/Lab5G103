import React from 'react';
import  AsyncSelect, { useAsync } from 'react-select/async';
import  ReactSelect from 'react-select';
import { useState } from 'react';
import {useRef} from 'react';
import config from './config'


import './AddHallway.css';
import { get } from 'http';
import Input from 'react-select/dist/declarations/src/components/Input';

const fetchBuildings = async  ()  => {
    var buildings: any[] =  []
    const res = await fetch(config.ServerURL + '/api/building/getall');
    const data = await res.json();
    for (let i = 0; i < data.buildingDTO.length; i++) {
        buildings.push({ value: data.buildingDTO[i].buildingName, label: data.buildingDTO[i].buildingName });
    }

    return buildings;
}



function AddHallway() {
    const [floor1Options, setFloor1Options] = useState<any[]>([]);
    const [floor2Options, setFloor2Options] = useState<any[]>([]);

    const [selected, setSelected] = useState({ value: '', label: ''});
    const [selected2, setSelected2] = useState({ value: '', label: ''});
    const [floorSelected, setFloorSelect] = useState({ value: '', label: ''});
    const [floorSelected2, setFloorSelect2] = useState({ value: '', label: ''});
    type SelectOptionType = { label: string, value: string }

    const position1 = useRef<any>(null);
    const position2 = useRef<any>(null);

    const getBuildings = async () => {
        const res = await fetch(config.ServerURL + '/api/building/getall');
        const data = await res.json();
        var retVal: any[] = data.buildingDTO;
        return retVal;
    }

    
    const customStyles = {
        control: (base:any) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 200,
          minWidth: 200
        
        })
      };

    const searchFloors = async (buildingName: string) => {
        let floors: any[] = [];
        console.log(buildingName);
        let buildings = await getBuildings();
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].buildingName === buildingName) {
                floors = buildings[i].floors;
                break;
            }
        }
        let retVal: any[] = [];
        for (let i = 0; i < floors.length; i++) {
            retVal.push({ value: floors[i], label: floors[i] });
            
        }
        
        return retVal;
    }

    const promiseOptions = () =>
        new Promise<any[]>((resolve) => {  
            
            resolve(fetchBuildings());
        }
    );

    const handleInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            
            setSelected(option)
            setFloor1Options(await searchFloors(option.value));
          }
    }

    const handleInputChange2 =async (option: SelectOptionType | null) => {
        if (option) {
            
            setSelected2(option)
            setFloor2Options(await searchFloors(option.value));
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

    const getCodes = async (building1: string, building2: string) => {
        let buildings = await getBuildings();
        let retVal: string[] = []
        for(let i = 0; i < buildings.length; i++ ){
            if(buildings[i].buildingName === building1 || buildings[i].buildingName === building2){
                retVal.push(buildings[i].buildingCode)
            }
        }
        return retVal
    }

    const OnClickListner = async () =>{
        let buildingCodes: string[] = await getCodes(selected.value, selected2.value)
        if (position1.current !== null && position2.current !== null) {
            let input1 = position1.current.value
            let input2 = position2.current.value
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buildingsCode: buildingCodes, floorsId: [floorSelected.value, floorSelected2.value], position: [input1, input2] })
        };
        fetch( config.ServerURL +'/api/hallway/create', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
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