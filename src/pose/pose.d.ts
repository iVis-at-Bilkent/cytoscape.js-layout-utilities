import { IPoint, IRectangle } from "./models/common";
import { Polygon } from "./models/polygon";
import { LayoutOptions, AdjList } from "./embedder/iembedder";
declare type PackReturn = {
    shifts: {
        dx: number;
        dy: number;
    }[];
};
/**
 * Packs regular disconnected graph components
 * @param components each component represents a connected graph in itself
 * @param options
 */
export declare const packComponents: (components: Component[], options?: LayoutOptions) => PackReturn;
declare type Node = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type Shape = IPoint[];
declare type ComponentEdge = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
declare type Component = {
    nodes: Node[];
    edges: ComponentEdge[];
};
export declare const getFrame: (polygons: Polygon[]) => IRectangle;
/**
 * Takes an array of polygons and returns which ones should be attractive to each other based on their center's voronoi diagrams
 * @param polygons
 */
export declare const constructEdges: (polygons: Polygon[]) => AdjList<number>;
export {};
