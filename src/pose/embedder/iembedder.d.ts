import { IEdge } from "../models/common";
import { Polygon } from "../models/polygon";
import { GridSquareDistanceDetection } from './distance-detection/gridsquare-distance-detection';
export declare enum DistanceDetectionType {
    BASIC = "BASIC",
    GRID_SQUARE = "GRID_SQUARE"
}
export declare type DistanceDetectionArgs = {
    type: DistanceDetectionType.BASIC;
} | {
    type: DistanceDetectionType.GRID_SQUARE;
    detection: GridSquareDistanceDetection;
};
export declare type LayoutOptions = {
    step?: number;
    componentDistance: number;
} & DistanceDetectionArgs;
export declare const DEFAULT_OPTIONS: LayoutOptions;
/**
 * Performs a single layout iteration
 * TODO: remove return type
 * @param components
 * @returns displacement correspond to each polygon
 */
export declare type LayoutFn = (components: PolyGraph, options: LayoutOptions) => void;
export declare type AdjList<T = number> = T[][];
export declare type EmbedderEdge = IEdge<number>;
/**
 * Graph which nodes are shaped like polygons
 */
export declare type PolyGraph = {
    nodes: Polygon[];
    /** indexes+  */
    edges: AdjList;
};
