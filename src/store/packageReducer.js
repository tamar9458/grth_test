const initalseState = {
    packages: []
}

function comparePacks(pack1, pack2) {
    return (pack1.name !== pack2.name) ||
         (pack1.trackingNumber !== pack2.trackingNumber) ||
         (pack1.collected !== pack2.collected) ||
         (pack1.lat !== pack2.lat) ||
         (pack1.lng !== pack2.lng)
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case "SET_PACKAGES": {
            const packs = action.data
            return { ...state, packages: packs }
        }
        case "ADD_PACKAGES": {
            const packs = [...state.packages];
            packs.push(action.data);
            return { ...state, packages: packs }
        }
        case "EDIT_PACKAGES": {
            const packs = [...state.packages];
            const findIndex = packs.findIndex(x => action.data.name=== x.name);
            // packs[findIndex].collected = !packs[findIndex].collected; --not works well
            packs[findIndex].collected = packs[findIndex].collected===true?false:true;
            return { ...state, packages: packs }
        }
        case "DELETE_PACKAGES": {
            const packages = [...state.packages];
            const packsToStay = packages.filter(x => comparePacks(action.data, x));
            return { ...state, packages: packsToStay }
        }
        default: return { ...state }
    }
}

export default reducer;