import React from 'react';
import  AsyncSelect, { useAsync } from 'react-select/async';
import config from './config'
import './ListElevator.css';

const fetchBuildings = async  ()  => {
    var buildings: any[] =  []
    const res = await fetch(config.ServerURL + '/api/building/getall');
    const data = await res.json();
    for (let i = 0; i < data.buildingDTO.length; i++) {
        buildings.push({ value: data.buildingDTO[i].buildingName, label: data.buildingDTO[i].buildingName });
    }

    return buildings;
}

function ListElevators(){

    const [selected, setSelected] = React.useState<any>(null);
    const [elevators, setElevators] = React.useState<any[]>([]);

    type SelectOptionType = { label: string, value: string }

    const customStyles = {
        control: (base:any) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 200,
          minWidth: 200
        
        })
    };

    const getBuildings = async () => {
        const res = await fetch(config.ServerURL + '/api/building/getall');
        const data = await res.json();
        var retVal: any[] = data.buildingDTO;
        return retVal;
    }

    const searchElevators = async (buildingName: string) => {
        let elevators: any[] = [];
        let buildings = await getBuildings();
        let buildingCode = "";
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].buildingName === buildingName) {
                buildingCode = buildings[i].buildingCode;
                break;
            }
        }
        console.log(buildingCode);
        const res = await fetch(config.ServerURL + '/api/elevator/getbybuilding?buildingCode=' + buildingCode);
        const data = await res.json();
        for (let i = 0; i < data.elevatorDTO.length; i++) {
            elevators.push(data.elevatorDTO[i]);
        }
        console.log(elevators);
        return elevators;
    }

    const promiseOptions = () =>
        new Promise<any[]>((resolve) => {  
            
            resolve(fetchBuildings());
        }
    );

    const handleInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            setSelected(option)
            let _elevators = await searchElevators(option.value);
            setElevators(_elevators);
        }
    }

    return (
        <div className="Hallway-body">
            <h4>Select building to lists their elevators</h4>
            <label htmlFor="building1">Building</label>
            <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
            <div className="Elevator-list">
                <h4>Elevators</h4>
                <div className="Elevator-list-items">
                {elevators.map((elevator, index) => (
                    <div key={index} className="Elevator-list-item">
                        <div className="Elevator-list-item-text">
                            <p className='Elevator-header'>Elevator {index + 1}</p>
                        </div>
                        <div className="Elevator-list-item-text">
                        <label htmlFor="elevatorName">Elevator building:</label>
                        <p className='Elevator-p'>{elevator.buildingId}</p>
                        </div>
                        <div className="Elevator-list-item-text">
                        <label htmlFor="elevatorFloor">Elevator floor:</label>
                        <p className='Elevator-p'>{elevator.floorId}</p>
                        </div>
                        <div className="Elevator-list-item-text">
                        <label htmlFor="elevatorposition" >Elevator position in grid:</label>
                        <p className='Elevator-p'>{elevator.position[0]}, {elevator.position[1]}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default ListElevators;