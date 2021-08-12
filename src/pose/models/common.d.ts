export declare type IPoint = {
    x: number;
    y: number;
};
export declare type ILine = {
    from: IPoint;
    to: IPoint;
};
export declare type IRectangle = {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};
export declare type INode = {
    min: IPoint;
    max: IPoint;
};
export declare type IEdge<T = IPoint> = {
    from: T;
    to: T;
};
export declare type IGraph = {
    nodes: INode[];
    edges: IEdge[];
};
export declare enum Side {
    Left = "Left",
    Right = "Right"
}
export declare const pointMultScalar: (p: IPoint, n: number) => IPoint;
/** p1 + p2 */
export declare const pointAdd: (p1: IPoint, p2: IPoint) => IPoint;
/** p1 - p2 */
export declare const diff: (p1: IPoint, p2: IPoint) => IPoint;
export declare const cross: ({ x: x1, y: y1 }: IPoint, { x: x2, y: y2 }: IPoint) => number;
export declare const pointLineClassification: (edge: IEdge, point: IPoint) => Side;
export declare const edgeIntersects: (e1: IEdge, e2: IEdge) => boolean;
/**
 * Calculates coeffiencts of the parametric representations of the lines at the intersection point.
 * Let e1 = ɑ * p1 + (1 - ɑ) * p2
 * and e2 = ɑ' * p1' + (1 - ɑ') * p2'
 * @returns ɑ and ɑ' as a 2-tuple
 */
export declare const intersectionCoefficients: (e1: IEdge, e2: IEdge) => [number, number];
/**
 * This function uses parametric representation of lines.
 * Let e1 = ɑ * p1 + (1 - ɑ) * p2
 * and e2 = ɑ' * p1' + (1 - ɑ') * p2'
 * We first calculate ɑ' by creating two equalities for each axis.
 * Then we can easily obtain the intersection point by substituting the value of these coefficients.
 * @returns point where the lines intersect
 */
export declare const lineIntersection: (e1: IEdge, e2: IEdge) => IPoint;
