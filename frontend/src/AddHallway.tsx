import React from 'react';
import AsyncSelect, { useAsync } from 'react-select/async';


import './AddHallway.css';

const fetchBuildings = async () => {
    var buildings: any[] =  []
    const res = await fetch('http://localhost:4000/api/building/getall');
    const data = await res.json();
    for (let i = 0; i < data.buildingDTO.length; i++) {
        console.log(data.buildingDTO[i].buildingName);
        buildings.push({ value: data.buildingDTO[i].buildingName, label: data.buildingDTO[i].buildingName });
    }
    console.log(buildings);
    return buildings;
}

function AddHallway() {
    
    const customStyles = {
        control: (base:any) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 200,
          minWidth: 200
        
        })
      };

    const promiseOptions = (inputValue: string) =>
        new Promise<any[]>((resolve) => {
            
            resolve(fetchBuildings());
            
  });

    return (
        <div className="Hallway-body">
            <h1>Add Hallway</h1>
            <div className="Hallway-Form">
                <label htmlFor="building1">Building 1</label>
                <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} />
                <label htmlFor="building2">Building 2</label>
                <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} />
                <button className="submit" >Create Hallway</button>
            </div>
        </div>

    );
}

export default AddHallway;