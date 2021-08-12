/**
 * This module implements O’Rourke-Chien-Olson-Naddor polygon intersection algorithm.
 * However, it only checks if there is an intersection.
 * Later it can be extended to calculate the intersection area as well.
 */
import { IEdge } from "../models/common";
import { Polygon } from "../models/polygon";
export declare enum AimState {
    /** Only left edge aims to right edge */
    Left = "Left",
    Right = "Right",
    Both = "Both",
    Neither = "Neither"
}
export declare const getAimState: (e1: IEdge, e2: IEdge) => AimState;
/**
 * Checks if two polygons has intersections or not.
 * Returns true if they intersect and false otherwise
 */
export declare const polygonIntersects: (p1: Polygon, p2: Polygon) => boolean;
