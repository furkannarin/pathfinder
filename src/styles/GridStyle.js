/* eslint-disable import/no-anonymous-default-export */
export default {
    container: { display: 'flex', flex: 1, flexDirection: 'column', margin: 5 },
    gridContainer: { display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center', borderWidth: 10, borderColor: 'gray', borderStyle: 'solid', borderRadius: 4 },
    rows: { display: 'flex', flex: 1, flexDirection: 'row', alignSelf: 'center' },
    unit: { width: 50, height: 50, borderWidth: 2, borderColor: 'black', borderStyle: 'solid', margin: 1 },
    inputContainers: renderGrid => ({ display: 'flex', flex: 1, flexDirection: renderGrid ? 'row' : 'column', alignSelf: 'center' }),
    buttonStyle: renderGrid => ({ width: 100, height: 50, alignSelf: 'center', marginLeft: renderGrid ? 5 : 0, marginTop: 10, fontSize: 18, borderRadius: 4, borderWidth: 0.5 })
};