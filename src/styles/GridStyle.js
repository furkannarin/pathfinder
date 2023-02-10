/* eslint-disable import/no-anonymous-default-export */
export default {
    container: { display: 'flex', flex: 1, flexDirection: 'column', margin: 5 },
    gridContainer: { display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center', borderWidth: 10, borderColor: 'gray', borderStyle: 'solid', borderRadius: 4 },
    rows: { display: 'flex', flex: 1, flexDirection: 'row', alignSelf: 'center' },
    cell: { width: 50, height: 50, borderWidth: 2, borderColor: 'black', borderStyle: 'solid', margin: 1 },
    inputContainers: { display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center' },
    buttonStyle: renderGrid => ({ width: 100, height: 50, alignSelf: 'center', marginLeft: renderGrid ? 5 : 0, marginTop: 10, fontSize: 18, borderRadius: 4, borderWidth: 0.5 }),
    paintBtns: isSelected => ({ width: 200, height: 50, alignSelf: 'center', color: isSelected ? "green" : "gray", fontSize: 18, marginLeft: 5, borderRadius: 4, borderWidth: 0.5, borderColor: isSelected ? "green" : "gray" }),
    runBtn: isDisabled => ({ width: 250, height: 50, alignSelf: 'center', marginLeft: 5, fontSize: 18, borderRadius: 4, borderWidth: 0.5, color: "red", backgroundColor: "black", opacity: isDisabled ? 0.25 : 1 }),

};