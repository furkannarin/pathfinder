let openNodes = [];
let target = {};

// const sleep = (duration = 20) => new Promise(res => setTimeout(res, duration));

const getDistanceToNode = (nodeCoordinates, destinationCoordinates) => {
    // send end destinations for distance to end destination
    // send start destinations for distante to start destination
    const destY = destinationCoordinates[0];
    const destX = destinationCoordinates[1];
    const nodeY = nodeCoordinates[0];
    const nodeX = nodeCoordinates[1];

    // √((x2 – x1)² + (y2 – y1)²) >> EUCLIDEAN DISTANCE
    return Math.trunc(Math.sqrt(Math.pow(nodeX - destX, 2) + Math.pow(nodeY - destY, 2)) * 10);
};

const findSurroundingNodes = (coordinates) => {
    const y = coordinates[0];
    const x = coordinates[1];

    const left = [y, x - 1];
    const left_down = [y - 1, x - 1];
    const left_up = [y + 1, x - 1];
    const down = [y - 1, x];
    const up = [y + 1, x];
    const right = [y, x + 1];
    const right_down = [y - 1, x + 1];
    const right_up = [y + 1, x + 1];

    const nodes = [left, left_down, left_up, down, up, right, right_down, right_up];
    const open = [];

    // check if these coordinates are open nodes
    nodes.forEach(node => {
        const nodeY = node[0];
        const nodeX = node[1];

        if (Array.isArray(openNodes[nodeY])) {
            // console.log('ARRAY EXISTS');
            if (openNodes[nodeY].length > 0) {
                // console.log('ARRAY HAS ITEMS');
                const nodeExists = openNodes[nodeY].includes(nodeX);
                // console.log(openNodes[nodeY], nodeX)
                if (!nodeExists) return null;
                // console.log('NODE EXISTS');

                const toDest = getDistanceToNode(node, target.end);
                const fromStart = getDistanceToNode(node, target.start);

                open.push({ coordinates: [ nodeY, nodeX ], toDest, fromStart, totalCost: toDest + fromStart });
            }
        }
    });

    // console.log('OPEN NEIGHBOUR COUNT >> ', open.length);
    return open;
};

const selectCheapestRoute = (nodes) => {
    const selection = nodes.reduce((n1, n2) => {
        if (n1.totalCost < n2.totalCost) return n1;
        if (n1.totalCost > n2.totalCost) return n2;
        if (n1.totalCost === n2.totalCost) {
            return n1.fromStart < n2.fromStart ? n1 : n2;
        }
    });

    const y = selection.coordinates[0];
    const x = selection.coordinates[1];

    openNodes[y] = openNodes[y].filter(c => c !== x);

    return selection.coordinates;
};

const run = async (destinations, openCells, setPath) => {
    openNodes = openCells;
    target = destinations;

    const { end, start } = destinations;
    let currentNode = start;

    const path = { selection: [], route: [] };
    let noPath = { st: false, iter: null };

    let iter = 0;
    while(currentNode[0] !== end[0] || currentNode[1] !== end[1]) {
        // an object containing the distance data of one of the surrounding nodes to the destination node
        const nodes = findSurroundingNodes(currentNode);
        if(nodes.length < 1) {
            noPath.st = true;
            noPath.iter = iter;
            setPath(path);
            window.alert(`No available paths could be found at ${iter}th iteration`)
            break;
        }

        const selection = selectCheapestRoute(nodes);
        if(selection) {
            currentNode = selection;
            path.selection.push(selection);
            nodes.forEach(p => path.route.push(p.coordinates));
        }


        iter++
        if(iter > 10000) {
            window.alert('Stopped the algorithm because it has iterated for 10.000 times!')
            break;
        }
    }

    if (!noPath.st) setPath(path);
};

export default run;