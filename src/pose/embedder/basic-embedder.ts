import { ILine, IPoint, IRectangle } from "../models/common";
import { Polygon } from "../models/polygon";
import { DistanceDetectionType, LayoutFn, LayoutOptions, PolyGraph } from "./iembedder";
import { convexPolygonDistance } from "../algorithms/convex-polygon-distance";
import { direction, lengthFromOrigin, slope } from '../utils';
import { turfPoly } from '../helpers/turf';
import intersection from '@turf/intersect';
import { constructEdges } from "../pose";



export const basicEmbed: LayoutFn = (components: PolyGraph, options: LayoutOptions) => {
    const ATTRACTIVE_CONSTANT = options.componentDistance, REPULSIVE_CONSTANT = options.componentDistance ** 2;
    const CONVERGENCE_THRESHOLD = 1;
    const EDGE_THRESHOLD = 5;
    const MAX_FORCE = ATTRACTIVE_CONSTANT;

    let hasIntersection = false;

    const makeForce = (multiplier: (n: number) => number) => {
        return (p1: Polygon, p2: Polygon) => {
            const { distance, unitVector } = convexPolygonDistance(p1, p2);

            const calculatedForce = multiplier(distance);
            const force = Math.abs(calculatedForce) < MAX_FORCE ?
                calculatedForce :
                MAX_FORCE * Math.sign(calculatedForce);
            
            return { x: unitVector.x * force, y: unitVector.y * force };
        };
    };

    const attractiveForce = makeForce(n => 3 * Math.log2(Math.sqrt(n) / ATTRACTIVE_CONSTANT));
    
    const repulsiveForce = makeForce(n => -REPULSIVE_CONSTANT / n);

    /**
     * Adds the intersection case
     * @param f displacement function without considering intersection
     */
    const displacementWrapper = (p1: Polygon, p2: Polygon, f: (p1: Polygon, p2: Polygon) => IPoint): IPoint => {
        const intersectionPoly = intersection(turfPoly(p1), turfPoly(p2));
        
        if (intersectionPoly === null) {
            return f(p1, p2);
        } else {
            hasIntersection = true;
            // Always move 5 units if intersection occurs
            const minForce = 5;

            const centerLine = { from: p1.center, to: p2.center };
            const dir = direction(centerLine);

            return { x: -dir.x * minForce, y: -dir.y * minForce };
        }
    }

    const turnForces = Array.from({ length: components.nodes.length }, () => ({ x: 0, y: 0 }));

    const applyAttractiveForces = (components: PolyGraph, forces: IPoint[]) => {
        for (let [from, neighbors] of components.edges.entries()) {
            for (let to of neighbors) {
                let poly1 = components.nodes[from];
                let poly2 = components.nodes[to];
        
                const displacement = displacementWrapper(poly1, poly2, attractiveForce);
        
                forces[from].x += displacement.x;
                forces[from].y += displacement.y;
        
                forces[to].x -= displacement.x;
                forces[to].y -= displacement.y;
            }
        }
    };

    const applyRepulsiveForces = (components: PolyGraph, forces: IPoint[]) => {
        if (options.type === DistanceDetectionType.BASIC) {
            const nodesLen = components.nodes.length; 
            
            for (let i = 0; i < nodesLen; ++i) {
                for (let j = i + 1; j < nodesLen; ++j) {
                    // Not connected
                    if (!components.edges[i].find(n => n === j)) {
                        const poly1 = components.nodes[i];
                        const poly2 = components.nodes[j];
                        
                        const displacement = displacementWrapper(poly1, poly2, repulsiveForce);
        
                        forces[i].x += displacement.x;
                        forces[i].y += displacement.y;
            
                        forces[j].x -= displacement.x;
                        forces[j].y -= displacement.y;
                    }
                }
            }
        } else {
            const distanceDetector = options.detection;
            
            throw new Error('TODO fix for not having adjacent edges');
    
            for (const [i, poly] of components.nodes.entries()) {
                const { collisions, neighbours } = distanceDetector.getNeighbours(poly);
    
                for (const j of collisions) {
                    // j <= i means visited because polygons are visited ordered
                    if (j <= i) {
                        continue;
                    }
                    const displacement = displacementWrapper(poly, components.nodes[j], repulsiveForce);

                    forces[i].x += displacement.x;
                    forces[i].y += displacement.y;
        
                    forces[j].x -= displacement.x;
                    forces[j].y -= displacement.y;
                }
    
                for (const j of neighbours) {
                    if (j <= i) {
                        continue;
                    }
                    const displacement = repulsiveForce(poly, components.nodes[j]);
    
                    forces[i].x += displacement.x;
                    forces[i].y += displacement.y;
        
                    forces[j].x -= displacement.x;
                    forces[j].y -= displacement.y;
                }
            }
        }
    };

    const moveFn = options.type === DistanceDetectionType.GRID_SQUARE ?
        options.detection.move :
        (index: number, displacement: IPoint) => { components.nodes[index].move(displacement); };

    const singleStep = () => {
        applyAttractiveForces(components, turnForces);
        
        applyRepulsiveForces(components, turnForces);
        
        let turnTotalForce = 0;

        // console.log(`forces: ${JSON.stringify(turnForces)}`);

        for (let i = 0; i < components.nodes.length; ++i) {
            moveFn(i, turnForces[i]);

            turnTotalForce += lengthFromOrigin(turnForces[i]);
            
            turnForces[i].x = 0;
            turnForces[i].y = 0;
        }

        const averageForce = turnTotalForce / components.nodes.length;

        return averageForce;
    };

    if (options.step !== undefined) {
        const step = options.step;
        for (let i = 0; i < step; ++i) {
            singleStep();
        }
    } else {
        let edgeCounter = 0;;

        while (true) {
            hasIntersection = false;

            const averageForce = singleStep();
    
            // console.log(`Average force: ${averageForce}`);

            edgeCounter += 1;
    
            if (!hasIntersection && averageForce <= CONVERGENCE_THRESHOLD) {
                return;
            } 

            if (edgeCounter >= EDGE_THRESHOLD) {
                // console.log("Recalculating edges...");
                components.edges = constructEdges(components.nodes);
            }
        }
    }
};

export const expandLine = (line: ILine, bbox: IRectangle): ILine => {
    if (line.from.x !== line.to.x) {
        const lineSlope = slope(line);

        if (line.from.x < line.to.x) {
            const leftP = line.from;
            const rightP = line.to;

            return {
                from: bbox.minX < leftP.x ?
                    ((() => {
                        const newX = bbox.minX;
                        const newY = line.to.y - lineSlope * (line.to.x - newX);

                        return { x: newX, y: newY };
                    })()) :
                    leftP,
                to: bbox.maxX > rightP.x ?
                    ((() => {
                        const newX = bbox.maxX;
                        const newY = line.from.y + lineSlope * (newX - line.from.x);

                        return { x: newX, y: newY };
                    })()) :
                    rightP,
            };
        } else {
            const leftP = line.to;
            const rightP = line.from;

            return {
                from: bbox.maxX > rightP.x ?
                    ((() => {
                        const newX = bbox.maxX;
                        const newY = line.to.y - lineSlope * (line.to.x - newX);

                        return { x: newX, y: newY };
                    })()) :
                    rightP,
                to: bbox.minX < leftP.x ?
                    ((() => {
                        const newX = bbox.minX;
                        const newY = line.from.y + lineSlope * (newX - line.from.x);

                        return { x: newX, y: newY };
                    })()) :
                    leftP,
            };
        }
    } else {
        // Edge case, if line is vertical, must expand vertically

        if (line.from.y < line.to.y) {
            const minYP = line.from;
            const maxYP = line.to;

            return {
                from: bbox.minY < minYP.y ?
                    { x: minYP.x, y: bbox.minY } :
                    minYP,
                to: bbox.maxY > maxYP.y ?
                    { x: maxYP.x, y: bbox.maxY } :
                    maxYP,
            };
        } else {
            const minYP = line.to;
            const maxYP = line.from;

            return {
                from: bbox.maxY > maxYP.y ? 
                    { x: maxYP.x, y: bbox.maxY } :
                    maxYP,
                to: bbox.minY < minYP.y ?
                    { x: minYP.x, y: bbox.minY } :
                    minYP,
            };
        }
    }
};