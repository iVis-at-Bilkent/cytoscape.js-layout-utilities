import { IEdge, IPoint, IRectangle } from "../models/common";
import { Polygon } from "../models/polygon";
import { GridSquareDistanceDetection } from './distance-detection/gridsquare-distance-detection';

export enum DistanceDetectionType {
    BASIC = "BASIC",
    GRID_SQUARE = "GRID_SQUARE",
}

export type DistanceDetectionArgs = 
    { 
        type: DistanceDetectionType.BASIC,
    } |
    { 
        type: DistanceDetectionType.GRID_SQUARE, 
        detection: GridSquareDistanceDetection,
    };

export type LayoutOptions = 
    {
        step?: number,
        componentDistance: number,
    } &
    DistanceDetectionArgs;

export const DEFAULT_OPTIONS: LayoutOptions = {
    type: DistanceDetectionType.BASIC,
    componentDistance: 50,
};

/**
 * Performs a single layout iteration
 * TODO: remove return type
 * @param components 
 * @returns displacement correspond to each polygon
 */
export type LayoutFn = (components: PolyGraph, options: LayoutOptions) => void;

export type AdjList<T = number> = T[][];

export type EmbedderEdge = IEdge<number>;

/**
 * Graph which nodes are shaped like polygons
 */
export type PolyGraph = {
    nodes: Polygon[],
    /** indexes+  */
    edges: AdjList,
};