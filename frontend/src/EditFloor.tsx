import config from './config';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import ReactSelect from 'react-select';
import { useRef } from 'react';
import Popup from 'reactjs-popup';


import './EditFloor.css'
import { parse } from 'path';

const fetchFloors = async  (building: string)  => {
    var buildings: any[] =  []
    const res = await fetch(config.ServerURL + '/api/building/getall');
    const data = await res.json();
    for (let i = 0; i < data.buildingDTO.length; i++) {
        buildings.push({ value: data.buildingDTO[i].buildingName, label: data.buildingDTO[i].buildingName });
    }

    return buildings;
}

const fetchBuildings = async () => {
    var buildings: any[] =  []
    const res = await fetch(config.ServerURL + '/api/building/getall');
    const data = await res.json();
    for (let i = 0; i < data.buildingDTO.length; i++) {
        buildings.push({ value: data.buildingDTO[i].buildingName, label: data.buildingDTO[i].buildingName });
    }

    return buildings;
}

type Floor = { 
    floorName: string;
    description: string;
    buildingCode: string;
    height: number;
    width: number;
    rooms: string[];
    grid: number[][];
 }

const getFloor = async (floorName: string) => {
    let floor: Floor = {floorName: '', description: '', buildingCode: '', height: 0, width: 0, rooms: [], grid: [[]]};
    
    const res = await fetch( config.ServerURL +'/api/floor?floorName='+floorName)

    const data = await res.json();
    floor = data.floorDTO;
    return floor;
}


function EditFloor(){
    const customStyles = {
        control: (base:any) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 200,
          minWidth: 200
        
        })
    };
    const [floor1Options, setFloor1Options] = useState<any[]>([]);

    const handleGridChange = (row: number, col: number) => (event: any) => {
        let newGrid = floorSelected.grid;
        newGrid[row][col] = event.target.value;
        setFloorSelect({...floorSelected, grid: newGrid});
    }
    
    const Grid = () => {
        
        return (
            <div className='grid'>
                {
                floorSelected.grid.map((row, index) => {
                    return (
                        <div className='row'>
                            {row.map((col, indexCol) => {
                                let colNumber = row.indexOf(col);
                                return (
                                    <input className='col' defaultValue={col} onBlur={handleGridChange(index,indexCol)}/>
                                    
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    const [selected, setSelected] = useState({ value: '', label: ''});
    const [floorSelected, setFloorSelect] = useState<Floor>({floorName: 'None', description: ' ', buildingCode: ' ', height: 0, width: 0, rooms: [], grid: [[]]});
    const [roomsList, setRooms] = useState<string[]>([]);

    const desc = useRef<any>(null);
    const build = useRef<any>(null);
    const height = useRef<any>(null);
    const width = useRef<any>(null);
    const rooms = useRef<any>(null);
    const grid = useRef<any>(null);
    const cols = useRef<any>(new Array().fill(new Array()));


    const handleLiClick = (room: string) => () => {
        setRooms(roomsList.filter((r) => r !== room));
    }
    
    var arrayDataItems = roomsList.map((room) => <li>{room}<button className='liButton' onClick={handleLiClick(room)}>Delete</button></li>);
    
    type SelectOptionType = { label: string, value: string }
    
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

    const handleFloorInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            console.log(option.value);
            let floor = await getFloor(option.value);
            setFloorSelect(floor);
            setRooms(floor.rooms);
            desc.current.value = floor.description;
            build.current.value = floor.buildingCode;
            height.current.value = floor.height;
            width.current.value = floor.width;

          }
    }

    const getBuildings = async () => {
        const res = await fetch(config.ServerURL + '/api/building/getall');
        const data = await res.json();
        var retVal: any[] = data.buildingDTO;
        return retVal;
    }

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

    const OnClickListner = async () => {
        let floor: Floor = {floorName: '', description: '', buildingCode: '', height: 0, width: 0, rooms: [], grid: [[]]};
        floor = floorSelected;
        floor.description = desc.current.value;
        floor.buildingCode = build.current.value;
        floor.height = height.current.value;
        floor.width = width.current.value;
        floor.rooms = roomsList;
        console.log(floor);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(floor)
        };
        const res = await fetch(config.ServerURL + '/api/floor/update', requestOptions);
        const data = await res.json();
        console.log(data);
        alert("Floor updated")
    }



    return (
        <div className="Floor-Body">
            <h1>EditFloor</h1>
            <p>Edit any propety and click Update floor to edit the floor with the new values</p>
            <div className='twoboxes'>
                <div className="Floor-selection">
                    <p>In wich building is the floor located?</p>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                    <p>What floor do you want to edit?</p>
                    <ReactSelect styles={customStyles} isSearchable={false} options={floor1Options} onChange={handleFloorInputChange}/>
                    <button className="submit" onClick={OnClickListner} >Update floor</button>
                </div>
                <div className="Floor-info">
                    
                    <div className='twoboxes'>
                        
                        <div className='info'>
                            <p className='infotext'>Floor name </p> 
                            <p className='infotext'>{floorSelected.floorName}</p>
                            <p className='infotext'>Description </p>
                            <textarea ref={desc} id="desc" name="name" className='input-desc' />
                            <p className='infotext'>Building code </p>
                            <input ref={build} type="text" id="build" name="name" className='input' />
                            <p className='infotext'>Height </p>
                            <input ref={height} type="text" id="height" name="name" className='input' onBlur={
                                (event) => {
                                    if(event.target.value === '') return;
                                    let newGrid = floorSelected.grid;
                                    let length = parseInt(event.target.value);
                                    newGrid.length = length;
                                    for(let i = 0; i < newGrid.length; i++){
                                        if(newGrid[i] === undefined){
                                            newGrid[i] = [];
                                        }
                                        for(let j = 0; j < newGrid[0].length; j++){
                                            if(newGrid[i][j] === undefined){
                                                newGrid[i][j] = 0;
                                            }
                                        }
                                        
                                    }
                                    setFloorSelect({...floorSelected, grid: newGrid});
                                    
                                }
                            
                            } />
                            <p className='infotext'>Width </p>
                            <input ref={width} type="text" id="width" name="name" className='input' onBlur={
                                (event) => {
                                    if(event.target.value === '') return;
                                    let newGrid = floorSelected.grid;
                                    let length = parseInt(event.target.value);
                                    for(let i = 0; i < newGrid.length; i++){
                                        newGrid[i].length = length;
                                        for(let j = 0; j < newGrid[0].length; j++){
                                            if(newGrid[i][j] === undefined){
                                                newGrid[i][j] = 0;
                                            }
                                        }
                                    }
                                    setFloorSelect({...floorSelected, grid: newGrid});
                                    
                                }
                            
                            
                            } />
                        </div>
                        <div className='info'>

                            <p className='infotext'>Rooms </p>
                            <input ref={rooms} id="rooms" name="name" className='input' />

                            <button className="addRoom" onClick={() => {
                                if (rooms.current !== null && rooms.current.value !== '') {
                                    setRooms([...roomsList, rooms.current.value]);
                                }
                                rooms.current.value = '';
                                }
                            } >Add room </button>

                            <ul>{arrayDataItems}</ul>
                            <p className='infotext'>Grid </p>
                            <div className='grid'>
                                <Grid />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            
            

        </div>
    )
}

export default EditFloor;