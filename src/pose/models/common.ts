export type IPoint = {
    x: number,
    y: number
};

export type ILine = {
    from: IPoint,
    to: IPoint,
};

export type IRectangle = {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
};

export type INode = {
    min: IPoint,
    max: IPoint,
};

export type IEdge<T = IPoint> = {
    from: T,
    to: T,
};

export type IGraph = {
    nodes: INode[],
    edges: IEdge[];
};

export enum Side {
	Left = "Left",
	Right = "Right",
}

export const pointMultScalar = (p: IPoint, n: number): IPoint => 
	({ x: p.x * n, y: p.y * n });

/** p1 + p2 */
export const pointAdd = (p1: IPoint, p2: IPoint): IPoint => 
	({ x: p1.x + p2.x, y: p1.y + p2.y });

/** p1 - p2 */
export const diff = (p1: IPoint, p2: IPoint): IPoint =>
	({ x: p1.x - p2.x, y: p1.y - p2.y });

export const cross = ({ x: x1, y: y1 }: IPoint, { x: x2, y: y2 }: IPoint): number =>
	((x1 * y2) - (y1 * x2));

export const pointLineClassification = (edge: IEdge, point: IPoint): Side => {
	const toRebased = diff(edge.to, edge.from);
	const pointRebased = diff(point, edge.from);

	return cross(pointRebased, toRebased) > 0 ?
		Side.Right : 
		Side.Left;
}

export const edgeIntersects = (e1: IEdge, e2: IEdge) => {
	const side1 = pointLineClassification(e1, e2.from);
	const side2 = pointLineClassification(e1, e2.to);
	const side3 = pointLineClassification(e2, e1.from);
	const side4 = pointLineClassification(e2, e1.to);

	return side1 !== side2 && 
		side3 !== side4;
	// TODO: handle edge cases
}

/**
 * Calculates coeffiencts of the parametric representations of the lines at the intersection point.
 * Let e1 = ɑ * p1 + (1 - ɑ) * p2
 * and e2 = ɑ' * p1' + (1 - ɑ') * p2'
 * @returns ɑ and ɑ' as a 2-tuple
 */
export const intersectionCoefficients = (e1: IEdge, e2: IEdge): [number, number] => {
	const { from: { x: x1, y: y1 }, to: { x: x2, y: y2 } } = e1;
	const { from: { x: x1_, y: y1_ }, to: { x: x2_, y: y2_ } } = e2;
	const ɑ_ = ((y2_ - y2) - ((x2_ - x2) / (x1 - x2) * (y1 - y2))) /
					((x1_ - x2_) / (x1 - x2) * (y1 - y2) - (y1_ - y2_));

	const ɑ = 	(ɑ_ * (x1_ - x2_) + x2_ - x2) /
				(x1 - x2);

	return [ɑ, ɑ_];
}

/**
 * This function uses parametric representation of lines.
 * Let e1 = ɑ * p1 + (1 - ɑ) * p2
 * and e2 = ɑ' * p1' + (1 - ɑ') * p2'
 * We first calculate ɑ' by creating two equalities for each axis. 
 * Then we can easily obtain the intersection point by substituting the value of these coefficients.
 * @returns point where the lines intersect
 */
export const lineIntersection = (e1: IEdge, e2: IEdge): IPoint => {
	const [ɑ, _] = intersectionCoefficients(e1, e2);
	
	return pointAdd(
		pointMultScalar(e1.from, ɑ),
		pointMultScalar(e1.to, (1 - ɑ))
	);
}