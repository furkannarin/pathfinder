let openNodes = [];
let target = {}

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

const findSurroundingNode = (i, coordinates) => {
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

    const result = {};
    if (i === 0) result.coordinates = left;
    if (i === 1) result.coordinates = left_down;
    if (i === 2) result.coordinates = left_up;
    if (i === 3) result.coordinates = down;
    if (i === 4) result.coordinates = up;
    if (i === 5) result.coordinates = right;
    if (i === 6) result.coordinates = right_down;
    if (i === 7) result.coordinates = right_up;

    // check if these coordinates are open nodes
    if (Array.isArray(openNodes[result.coordinates[0]])) {
        if (openNodes[result.coordinates[0]].length > 0) {
            const nodeExists = openNodes[result.coordinates[0]].includes(result.coordinates[1]);
            if(!nodeExists) return null;

            const toDest = getDistanceToNode(result.coordinates, target.end);
            const fromStart = getDistanceToNode(result.coordinates, target.start);

            return { ...result, toDest, fromStart, totalCost: toDest + fromStart }
        }
    }

    return null;
};

const selectCheapestRoute = (nodes) => {
    let minCost = 1000000000000000;
    let costOfMoving = 1000000000000000;
    let selection = null;

    nodes.forEach(n => {
        if (n.toDest <= minCost) {
            if(n.fromStart <= costOfMoving) {
                minCost = n.toDest;
                selection = n;
            }
        }
    })

    console.log(selection)
    return selection;
}

const run = (destinations, openCells, setPath) => {
    openNodes = openCells;
    target = destinations;

    const { end, start } = destinations;
    let currentNode = start;

    const path = [];
    let nodes = [];

    let iter = 0;
    while(currentNode[0] !== end[0] || currentNode[1] !== end[1]) {
        // increment 8 times because 8 is the maximum number of nodes a node can have in its surrounding
        for (let i = 0; i < 8; i++) {
            const node = findSurroundingNode(i, currentNode); // an object containing the distance data of one of the surrounding nodes to the destination node
            if (node) nodes.push(node);
        }

        const selection = selectCheapestRoute(nodes);
        if(selection) {
            currentNode = selection.coordinates;
            path.push(selection.coordinates);
        }
        nodes = [];
        iter++;
        if(iter > 15) break;
    }

    // console.log(path)
};

export default run;