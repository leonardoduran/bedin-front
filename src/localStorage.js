export const loadState = () => {
	try{
		const serializedState=localStorage.getItem('state');
		if(serializedState === null){
			return undefined;
		}
		return undefined; //(Para que no tome el estado guardado cuando refresca la página)
		return JSON.parse(serializedState);
	}catch(err){
		return undefined;
	}
}

export const saveState = (state) =>{
	try{
		const serializedState=JSON.stringify(state);
		localStorage.setItem('state',serializedState);
	}catch(err){

	}
}