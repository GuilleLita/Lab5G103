import React from 'react';
import AsyncSelect, { useAsync } from 'react-select/async';


import './AddHallway.css';
import { get } from 'http';

const fetchBuildings = async  ()  => {
    var buildings: any[] =  []
    const res = await fetch('http://localhost:4000/api/building/getall');
    const data = await res.json();
    for (let i = 0; i < data.buildingDTO.length; i++) {
        buildings.push({ value: data.buildingDTO[i].buildingName, label: data.buildingDTO[i].buildingName });
    }

    return buildings;
}



function AddHallway() {
    
    const getBuildings = async () => {
        const res = await fetch('http://localhost:4000/api/building/getall');
        const data = await res.json();
        var retVal: any[] = data.buildingDTO;
        return retVal;
    }

    const buildings = getBuildings();

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
        const res = await getBuildings();
        let floors: any[] = [];
        for (let i = 0; i < res.length; i++) {
            if (res[i].buildingName === buildingName) {
                floors = res[i].floors;
                break;
            }
        }
        for (let i = 0; i < floors.length; i++) {
            floors[i] = { value: floors[i].floorNumber, label: floors[i].floorNumber };
        }
        return floors;
    }

    const promiseOptions = () =>
        new Promise<any[]>((resolve) => {  
            resolve(fetchBuildings());
        }
    );

    const promiseOptions2 = (floor :string) =>
        new Promise<any[]>((resolve) => {  
            resolve(searchFloors(floor));
        }
    );

    return (
        <div className="Hallway-body">
            <h1>Add Hallway</h1>
            <div className="Hallway-Form">
                <div className="Hallway-Form-Field">
                    <label htmlFor="building1">Building 1</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={} />
                    <label htmlFor="floor1">Floor</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions2()} />
                </div>
                <div className="Hallway-Form-Field">
                    <label htmlFor="building2">Building 2</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} />
                    <label htmlFor="floor2">Floor</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions2} />
                </div>
                
            </div>
            <button className="submit" >Create Hallway</button>
        </div>

    );
}

export default AddHallway;